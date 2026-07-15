
from fastapi import FastAPI, UploadFile, File, Form, HTTPException  # type: ignore[import]
from fastapi.middleware.cors import CORSMiddleware  # type: ignore[import]

import os
import json
import shutil
from uuid import uuid4

app = FastAPI(title="Food Allergy Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
async def home():
    return {"message": "Food Allergy Detection API is running"}


@app.get("/api/v1/health")
async def health():
    return {"status": "ok"}



# OCR - text extraction
@app.post("/api/v1/extract-ingredients")
async def extract_ingredients(
    image: UploadFile = File(...)
):
    image_path = None

    try:
        filename = f"{uuid4()}_{image.filename}"
        image_path = os.path.join(UPLOAD_FOLDER, filename)

        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        from Bert import extract_text, normalize_text, analyze_allergens

        text = extract_text(image_path)
        ingredients = normalize_text(text)
        allergens = analyze_allergens(ingredients)

        return {
            "ingredients": ingredients,
            "allergens": allergens
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if image_path and os.path.exists(image_path):
            os.remove(image_path)



# Food Prediction - CLIP
@app.post("/api/v1/predict-food")
async def predict_food(
    image: UploadFile = File(...),
    exclude: str = Form("[]")
):
    image_path = None

    try:
        exclude = json.loads(exclude)

        filename = f"{uuid4()}_{image.filename}"
        image_path = os.path.join(UPLOAD_FOLDER, filename)

        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        from Clip import predict_food, FOOD_LABELS

        labels = [x for x in FOOD_LABELS if x not in exclude]

        food, confidence = predict_food(image_path, labels)

        return {
            "food": food,
            "confidence": round(confidence, 3)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if image_path and os.path.exists(image_path):
            os.remove(image_path)



# Analyze allergens based on food name
@app.post("/api/v1/analyze-allergens")
async def analyze_allergens(
    food_name: str = Form(...)
):
    try:
        from ingredients import get_ingredients
        from Bert import analyze_allergens

        ingredients = get_ingredients(food_name)
        allergens = analyze_allergens(ingredients)

        return {
            "food": food_name,
            "ingredients": ingredients,
            "allergens": allergens
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))