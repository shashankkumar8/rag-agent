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



📬 Contact
GitHub: https://github.com/shashankkumar8/

Built with ❤️ using FastAPI, React, Qdrant, and OpenAI

If you found this project helpful, please give it a ⭐ on GitHub!
