# 🤖 RAG AI Agent - Production Ready

A production-ready Retrieval-Augmented Generation (RAG) AI Agent with a beautiful landing page, streaming responses, and document citations.

![RAG Agent Demo](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.11+-green)
![React](https://img.shields.io/badge/React-18-blue)

## ✨ Features

- 📄 **Document Ingestion** - Upload .txt or .md files securely
- 💬 **Streaming Chat** - Real-time AI responses with typewriter effect
- 📚 **Source Citations** - Every answer includes references to original documents
- 🎨 **Modern UI** - Clean landing page + responsive chat interface
- 🐳 **Docker Ready** - One-command local deployment
- ☁️ **Cloud Deployed** - Frontend on Vercel, Backend on Render
- 🔒 **CORS Protected** - Production-ready security configuration

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/shashankkumar8/rag-agent.git
cd rag-agent

# Create backend environment file
cd backend
cp .env.example .env
# Edit .env with your OpenAI API key

# Start all services (Docker Desktop must be running)
cd ..
docker compose up --build

# Open in browser
http://localhost:5173
```


## 🏗️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | FastAPI + Python |
| **Vector DB** | Qdrant |
| **AI Model** | OpenAI `gpt-4o-mini` & `text-embedding-3-small` |
| **Deployment** | Vercel (Frontend) + Render (Backend) |
| **Containerization**| Docker |

---

## 🌐 Live Demo

* **Frontend:** https://rag-agent-p72x.vercel.app/
* **Backend:** https://rag-agent-backend-ev0o.onrender.com/
* **GitHub Repository:** (https://github.com/shashankkumar8/rag-agent)

---

## ⚙️ Setup & Configuration

### Environment Variables
Create a file named `.env` inside your `backend/` directory and add the following keys:

```env
OPENAI_API_KEY=your-openai-key-here
QDRANT_URL=http://qdrant:6333
QDRANT_COLLECTION=docs
EMBEDDING_MODEL=text-embedding-3-small
LLM_MODEL=gpt-4o-mini
MAX_K=5




Method,Endpoint,Description
GET,/health,Health check to verify backend status
POST,/api/ingest,Upload and process documents into chunks
POST,/api/chat,Chat with the RAG agent with streaming responses



📬 Contact
GitHub: https://github.com/shashankkumar8/

Built with ❤️ using FastAPI, React, Qdrant, and OpenAI

If you found this project helpful, please give it a ⭐ on GitHub!
