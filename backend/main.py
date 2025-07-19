from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import workflow
from routes import knowledge_base
from routes import llm

app = FastAPI()

app.include_router(workflow.router, prefix="/api/workflow")
app.include_router(knowledge_base.router, prefix="/api/knowledge-base")
app.include_router(llm.router, prefix="/api/llm")

@app.get("/")
def read_root():
    return {"message": "Backend is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)