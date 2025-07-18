# AI Workflow Builder

A no-code/low-code web application that enables users to visually design and execute intelligent workflows powered by LLMs and document processing pipelines. Users can construct workflows with components like document ingestion, embeddings, language model interaction, and chat-based output—all within a drag-and-drop UI.

---

## 🧠 Features

- Drag-and-drop canvas to build intelligent workflows
- Visual pipeline of modular components: Query, KnowledgeBase, LLM Engine, and Output
- Document upload and processing with text extraction (PyMuPDF)
- Context-aware responses using OpenAI/Gemini LLMs
- Real-time chat interface with memory
- Workflow validation and execution engine
- Optional:logs, chat history, and authentication

---

## 🛠️ Tech Stack

| Layer       | Technology       |
|-------------|------------------|
| Frontend    | React.js, React Flow |
| Backend     | FastAPI (Python) |
| Database    | PostgreSQL       |
| Vector Store| ChromaDB         |
| Embeddings  | OpenAI, Gemini   |
| LLM         | OpenAI GPT, Gemini |
| File Parsing| PyMuPDF          |

---

## 🎯 Core Components

### 1. **User Query Component**
- Accepts user input via a chat interface
- Serves as the entry point of the workflow

### 2. **KnowledgeBase Component**
- Upload PDF documents and extract text
- Create and store embeddings in ChromaDB
- Retrieve relevant context for queries

### 3. **LLM Engine Component**
- Accepts query and optional context
- Sends prompt to OpenAI/Gemini models

### 4. **Output Component**
- Displays final response as a chat
- Supports follow-up queries with preserved logic

---

## 🧩 Frontend Overview

- **Component Library Panel**: Drag & drop the 4 workflow components
- **Workspace Panel**: Visual canvas with pan, zoom, snap-to-grid (optional)
- **Component Config Panel**: Dynamic configuration inputs per node
- **Execution Controls**: Build and validate the stack, trigger chat interaction

---

## 🔧 Backend Overview

- Built with FastAPI, offering endpoints for:
  - File uploads and document parsing
  - Embedding generation and vector search
  - Workflow execution orchestration
  - LLM and search tool integration

---

## 🗃️ Database Schema

Using PostgreSQL to persist:
- Document metadata
- Workflow definitions (optional)
- Chat logs (optional)
- User authentication data

---

## 🔌 Setup Instructions

### Prerequisites
- Node.js >= 18.x
- Python >= 3.10
- PostgreSQL >= 14
- [Optional] Virtualenv or Conda for Python environments

### Frontend

```bash
cd frontend
npm install
npm run dev
```
### Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate
uvicorn main:app --reload
