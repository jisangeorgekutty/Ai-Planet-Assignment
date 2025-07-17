from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import workflow 

app = FastAPI()

app.include_router(workflow.router, prefix="/api/workflow")

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