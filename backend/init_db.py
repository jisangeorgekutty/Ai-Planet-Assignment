# init_db.py
from models.db import engine
from models.schemas import Base

Base.metadata.create_all(bind=engine)
print("✅ Tables created.")