import os, json, asyncio, hashlib
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from qdrant_client import AsyncQdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from app.config import settings

app = FastAPI(title="RAG Agent API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

qdrant = AsyncQdrantClient(url=settings.QDRANT_URL)
embedder = OpenAIEmbeddings(model=settings.EMBEDDING_MODEL, openai_api_key=settings.OPENAI_API_KEY)
llm = ChatOpenAI(model=settings.LLM_MODEL, temperature=0.2, openai_api_key=settings.OPENAI_API_KEY)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a precise RAG assistant. Answer using ONLY the provided context. If unsure, say so. Cite sources when possible.\n\nContext:\n{context}"),
    ("human", "{input}")
])

async def ensure_collection():
    cols = await qdrant.get_collections()
    if settings.QDRANT_COLLECTION not in [c.name for c in cols.collections]:
        await qdrant.create_collection(settings.QDRANT_COLLECTION, VectorParams(size=1536, distance=Distance.COSINE))

@app.post("/api/ingest")
async def ingest(file: UploadFile = File(...)):
    if not file.filename.endswith((".txt", ".md")):
        raise HTTPException(400, "Only .txt/.md files supported")
    await ensure_collection()
    text = (await file.read()).decode("utf-8")
    chunks = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100).split_text(text)
    vecs = await embedder.aembed_documents(chunks)
    points = [
        PointStruct(id=hashlib.md5(c.encode()).hexdigest(), vector=v, payload={"text": c, "source": file.filename})
        for c, v in zip(chunks, vecs)
    ]
    await qdrant.upsert(settings.QDRANT_COLLECTION, points)
    return {"status": "ok", "chunks": len(chunks)}

@app.post("/api/chat")
async def chat(query: str = Query(...)):
    await ensure_collection()
    qvec = (await embedder.aembed_query(query))
    hits = await qdrant.query_points(settings.QDRANT_COLLECTION, query=qvec, limit=settings.MAX_K, with_payload=True)
    docs = [{"text": h.payload["text"], "source": h.payload["source"], "score": round(h.score, 3)} for h in hits.points]
    context = "\n\n".join([f"[{d['source']}]: {d['text']}" for d in docs])

    async def stream():
        chain = prompt | llm
        async for chunk in chain.astream({"input": query, "context": context}):
            if chunk.content:
                yield f"data: {json.dumps({'content': chunk.content, 'sources': docs})}\n\n"
                await asyncio.sleep(0.02)
        yield "data: [DONE]\n\n"

    return StreamingResponse(stream(), media_type="text/event-stream")

@app.get("/health")
def health(): return {"status": "ok"}