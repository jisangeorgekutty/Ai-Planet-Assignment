from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models.db import SessionLocal
from models.schemas import Workflow
import json

router = APIRouter()

class WorkflowCreateRequest(BaseModel):
    user_id: str
    name: str
    description: str

@router.post("/create-workflow")
def create_workflow(payload: WorkflowCreateRequest):
    db: Session = SessionLocal()

    workflow = Workflow(
        user_id=payload.user_id,
        name=payload.name,
        description=payload.description,
    )

    db.add(workflow)
    db.commit()
    db.refresh(workflow)
    db.close()

    return {"workflow_id": workflow.id, "message": "Stack created"}