from fastapi import APIRouter, File, UploadFile, Form, HTTPException
import fitz  
import os
import chromadb
import uuid
from vertexai.language_models import TextEmbeddingModel
import vertexai
from typing import List
import tempfile
from dotenv import load_dotenv
from pathlib import Path
load_dotenv()

router = APIRouter()

credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if credentials_path:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(Path(credentials_path).resolve())

# Initialize ChromaDB
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="knowledge_base")

# Initialize Vertex AI project/region
vertexai.init(project="genai-workflow", location="us-central1")

def generate_gemini_embedding(texts: List[str], model_name: str):
    model = TextEmbeddingModel.from_pretrained(model_name)
    return model.get_embeddings(texts)

@router.post("/upload-doc/")
async def upload_doc(
    file: UploadFile = File(...),
    user_query: str = Form(...),
    api_key: str = Form(...), 
    embedding_model: str = Form(...)
):
    try:
        contents = await file.read()

        temp_dir = tempfile.gettempdir()
        temp_file_path = os.path.join(temp_dir, f"{uuid.uuid4()}.pdf")

        with open(temp_file_path, "wb") as f:
            f.write(contents)
        if not os.path.exists(temp_file_path):
            raise HTTPException(status_code=500, detail="Failed to save file to temporary directory.")

        # Extract text
        doc = fitz.open(temp_file_path)
        text_chunks = []
        for page in doc:
            text = page.get_text().strip()
            if text:
                text_chunks.append(text[:3000])
        doc.close()

        os.remove(temp_file_path)

        if not text_chunks:
            raise HTTPException(status_code=400, detail="No readable text found in PDF.")

        print(" Extracted Chunks:", len(text_chunks))
        print("User Query:", user_query)

        if embedding_model.startswith("gemini"):
            embeddings = generate_gemini_embedding(text_chunks, "textembedding-gecko@003")
            for i, (chunk, emb) in enumerate(zip(text_chunks, embeddings)):
                collection.add(
                    documents=[chunk],
                    ids=[f"{file.filename}_{i}"],
                    embeddings=[emb.values]
                )

            query_embedding = generate_gemini_embedding([user_query], "textembedding-gecko@003")[0].values
            results = collection.query(query_embeddings=[query_embedding], n_results=3)

            print("Top Relevant Chunks:", results['documents'][0])

            return {
                "message": "Document processed with Gemini embeddings.",
                "relevant_chunks": results['documents'][0]
            }

        else:
            raise HTTPException(status_code=400, detail=f"Unsupported embedding model: {embedding_model}")

    except Exception as e:
        import traceback
        traceback.print_exc()  # This will show the full error in terminal
        raise HTTPException(status_code=500, detail=str(e))
