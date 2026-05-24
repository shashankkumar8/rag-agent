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

Environment Variables
Create backend/.env with the following:

env

OPENAI_API_KEY=sk-your-openai-key-here
QDRANT_URL=http://qdrant:6333
QDRANT_COLLECTION=docs
EMBEDDING_MODEL=text-embedding-3-small
LLM_MODEL=gpt-4o-mini
MAX_K=5

🏗️ Tech Stack
Component Technology
Frontend
React 18 + Vite + Tailwind CSS + TypeScript
Backend
FastAPI + Python 3.11 + Uvicorn
Vector DB
Qdrant (Self-hosted + Cloud)
AI Model
OpenAI GPT-4o-mini + Embeddings
Deployment
Vercel (Frontend) + Render (Backend)
Container
Docker + Docker Compose
Streaming Server-Sent Events (SSE)

📁 Project Structure




rag-agent/
├── backend/ # FastAPI Backend
│ ├── app/
│ │ ├── **init**.py
│ │ ├── config.py # Pydantic settings
│ │ └── main.py # API endpoints
│ ├── .env # Environment variables (gitignored)
│ ├── .env.example # Template for .env
│ ├── Dockerfile
│ └── requirements.txt
├── frontend/ # React Frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── layouts/ # Page layouts (Navbar, Footer)
│ │ ├── lib/ # Utility functions
│ │ ├── pages/ # Landing Page + Chat App
│ │ ├── App.tsx # Router configuration
│ │ ├── index.css # Tailwind styles
│ │ └── main.tsx # Entry point
│ ├── Dockerfile
│ ├── index.html
│ ├── package.json
│ ├── vercel.json # Vercel configuration
│ └── vite.config.ts
├── docker-compose.yml # Docker orchestration
├── .gitignore
└── README.md

📝 API Endpoints
Method Endpoint Description Request Response
GET /health Health check None {"status":"ok"}
POST /api/ingest Upload documents FormData(file) {"status":"ok","chunks":N}
POST /api/chat Chat with streaming ?query=text text/event-stream
Example: Chat Request
Bash

curl -X POST "http://localhost:8000/api/chat?query=What%20is%20AI?"
Example: Upload Document

Bash

curl -X POST -F "file=@document.txt" http://localhost:8000/api/ingest

🔧 Configuration
Backend Environment Variables
Variable Description Default
OPENAI_API_KEY Your OpenAI API key Required
QDRANT_URL Qdrant database URL http://qdrant:6333
QDRANT_COLLECTION Collection name docs
EMBEDDING_MODEL OpenAI embedding model text-embedding-3-small
LLM_MODEL OpenAI chat model gpt-4o-mini
MAX_K Max retrieved chunks 5
Frontend Environment Variables
Variable Description Default
VITE_API_URL Backend API URL http://localhost:8000

🐳 Docker Commands
Bash

# Start all services

docker compose up --build

# Start in background

docker compose up -d

# View logs

docker compose logs -f

# Stop all services

docker compose down

# Rebuild from scratch

docker compose down --rmi all --volumes
docker compose up --build
🔧 Troubleshooting
Connection Refused
text

Error: Connection refused to qdrant:6333
Fix: Make sure Docker Desktop is running. Inside Docker, use http://qdrant:6333. Locally, use http://localhost:6333.

CORS Errors
text

Error: CORS policy blocked
Fix: Update backend/app/main.py CORS origins to include your Vercel URL exactly.

OpenAI 401 Error
text

Error: Invalid API key
Fix: Check your OPENAI_API_KEY in Render environment variables. Get a new key from https://platform.openai.com/api-keys

Vercel Build Fails
text

Error: Build failed
Fix: Run npm run build locally first. Fix TypeScript errors before pushing.

Render Service Sleeps
text

Note: Free tier services sleep after 15 minutes of inactivity
Fix: This is a Render free tier limitation. Consider upgrading or use Railway/Render Pro.

📊 Performance
First Token: ~500ms
Streaming: Real-time (word-by-word)
Document Ingestion: ~2-5 seconds per file
Vector Search: ~100-300ms

🛡️ Security
✅ Environment variables never committed to Git
✅ CORS configured for production domains only
✅ API key stored in cloud environment variables
✅ Docker containers run as non-root user
✅ Input validation on all endpoints

📄 License

MIT License - feel free to use for personal or commercial projects.

Copyright (c) 2024 Shashank Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.


🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📬 Contact
GitHub: https://github.com/shashankkumar8/

Built with ❤️ using FastAPI, React, Qdrant, and OpenAI

If you found this project helpful, please give it a ⭐ on GitHub!
