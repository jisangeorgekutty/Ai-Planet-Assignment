from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models.db import SessionLocal
from models.schemas import Workflow
from fastapi import Query
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

@router.get("/user-stacks")
def get_stacks(user_id: str = Query(...)):
    db: Session = SessionLocal()
    stacks = db.query(Workflow).filter(Workflow.user_id == user_id).all()
    db.close()
    return [{"id": s.id, "name": s.name, "description": s.description} for s in stacks]

@router.put("/update/{workflow_id}")
def update_workflow(workflow_id: int, payload: WorkflowCreateRequest):
    db: Session = SessionLocal()
    workflow = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not workflow:
        return {"error": "Workflow not found"}

    workflow.name = payload.name
    workflow.description = payload.description
    db.commit()
    db.refresh(workflow)
    db.close()
    return {"message": "Workflow updated"}

@router.get("/{workflow_id}")
def get_workflow(workflow_id: int):
    db = SessionLocal()
    workflow = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    db.close()
    if workflow:
        return {
            "id": workflow.id,
            "name": workflow.name,
            "description": workflow.description,
            "user_id": workflow.user_id
        }
    return {"error": "Workflow not found"}