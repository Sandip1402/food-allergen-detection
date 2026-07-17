from fastapi import APIRouter, UploadFile, File, Form
from app.ml.Clip import predict_food, FOOD_LABELS
from app.ml.ingredients import get_ingredients
from app.ml.Own_model import analyze_allergens
from app.ml.Bert import analyze_ingredient_image

from fastapi import HTTPException
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

    try:

        # -------------------------
        # FOOD IMAGE
        # -------------------------
        if mode == "food":

            food_name, confidence = predict_food(image_path, FOOD_LABELS)

            ingredients = get_ingredients(food_name)

            allergens = analyze_allergens(ingredients)

            ingredient_list = [i.strip() for i in ingredients.split(",")]

            return {
                "mode": "food",
                "food": food_name,
                "confidence": round(float(confidence), 3),
                "ingredients": ingredient_list,
                "allergens": allergens
            }

        # -------------------------
        # INGREDIENT LABEL IMAGE
        # -------------------------
        elif mode == "ingredient":

            ingredient_list, allergens = analyze_ingredient_image(image_path)

            return {
                "mode": "ingredient",
                "food": None,
                "confidence": None,
                "ingredients": ingredient_list,
                "allergens": allergens,
            }

    finally:
        if os.path.exists(image_path):
            os.remove(image_path)