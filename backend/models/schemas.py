from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from models.db import Base

class Workflow(Base):
    __tablename__ = "workflows"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False)  # Store Clerk or auth user ID
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

