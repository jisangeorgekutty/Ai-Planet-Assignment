from fastapi import APIRouter, Form, HTTPException
import requests
import openai 

router = APIRouter()

@router.post("/llm-model/")
async def call_llm(
    model: str = Form(...),
    api_key: str = Form(...),
    prompt: str = Form(...),
    temperature: float = Form(0.7)
):
    try:
        if model.startswith("Gemini"):
            # === Gemini ===
            headers = {
                "Content-Type": "application/json"
            }
            payload = {
                "contents": [
                    {
                        "parts": [{"text": prompt}]
                    }
                ],
                "generationConfig": {
                    "temperature": temperature
                }
            }
            endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
            response = requests.post(endpoint, headers=headers, json=payload)

            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.json())

            data = response.json()
            generated_text = data["candidates"][0]["content"]["parts"][0]["text"]
            return {"response": generated_text}

        elif model.startswith("GPT"):
            # === OpenAI ===
            openai.api_key = api_key

            completion = openai.ChatCompletion.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                temperature=temperature
            )
            generated_text = completion.choices[0].message.content
            return {"response": generated_text}

        else:
            raise HTTPException(status_code=400, detail="Unsupported model provider.")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




