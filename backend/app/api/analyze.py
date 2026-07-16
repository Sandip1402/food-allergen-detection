from fastapi import APIRouter, UploadFile, File, Form
from app.ml.Clip import predict_food, FOOD_LABELS
from app.ml.ingredients import get_ingredients
from app.ml.Own_model import analyze_allergens
from app.ml.Bert import extract_text, normalize_text
import os
import shutil
from uuid import uuid4

router = APIRouter(
    prefix="/api",
    tags=["Analysis"]
)

UPLOAD_FOLDER = "app/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    mode: str = Form(...)
):
    filename = f"{uuid4()}_{image.filename}"
    image_path = os.path.join(UPLOAD_FOLDER, filename)

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    if mode == "food":
        food_name, confidence = predict_food(image_path, FOOD_LABELS)

        ingredients = get_ingredients(food_name)

        allergens = analyze_allergens(ingredients)

        ingredient_list = [i.strip() for i in ingredients.split(",")]

        return {
            "food": food_name,
            "confidence": confidence,
            "ingredients": ingredient_list,
            "allergens": allergens
        }

    elif mode == "ingredient":
        ingredients = extract_text(image_path)

        allergens = analyze_allergens(ingredients)

        ingredient_list = [i.strip() for i in ingredients.split(",")]

        return {
            "food": None,
            "confidence": None,
            "ingredients": ingredient_list,
            "allergens": allergens
        }

    return {
        "error": "Invalid mode"
    }