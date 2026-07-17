import csv
import re
from collections import defaultdict
from pathlib import Path

import pytesseract
import torch
from PIL import Image
from transformers import BertTokenizer, BertModel

# -----------------------------
# Paths
# -----------------------------
BASE_DIR = Path(__file__).resolve().parents[2]
DATASET_DIR = BASE_DIR / "datasets"

# -----------------------------
# Tesseract
# -----------------------------
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

# -----------------------------
# Load BERT (Local Cache Only)
# -----------------------------
MODEL_NAME = "bert-base-uncased"

tokenizer = BertTokenizer.from_pretrained(
    MODEL_NAME,
    local_files_only=True
)

model = BertModel.from_pretrained(
    MODEL_NAME,
    local_files_only=True
)

model.eval()


# -----------------------------
# OCR
# -----------------------------
def extract_text(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return clean_ingredients(text)


def normalize_text(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


import re

KNOWN_INGREDIENTS = [
    "milk solids",
    "milk",
    "cocoa butter",
    "cocoa solids",
    "sugar",
    "butter",
    "wheat flour",
    "wheat",
    "soybean oil",
    "soy",
    "egg",
    "tree nuts",
    "peanut",
    "almond",
    "cashew",
    "walnut",
    "barley",
    "rye",
    "oats",
    "salt",
    "cocoa",
    "vanilla",
    "emulsifier",
    "lecithin"
]

def extract_ingredients(text):
    if not text:
        return []

    text = normalize_text(text)

    # Keep only the Ingredients section
    contains_text = ""

    if "contains" in text:
        text, contains_text = text.split("contains", 1)

    elif "may contain" in text:
        text, contains_text = text.split("may contain", 1)

    detected = []

    for ingredient in KNOWN_INGREDIENTS:
        if re.search(rf"\b{re.escape(ingredient)}\b", text):
            detected.append(ingredient)

    return sorted(set(detected)), contains_text


def clean_ingredients(text):
    """
    Convert OCR output into a clean comma-separated ingredient string.
    """

    text = normalize_text(text)

    # Remove common packaging words
    remove_words = [
        "ingredients",
        "contains",
        "may contain",
        "warning",
        "allergen",
        "nutrition facts"
    ]

    for word in remove_words:
        text = text.replace(word, " ")

    # Normalize spaces
    text = re.sub(r"\s+", " ", text).strip()

    # Common allergens that should become separate ingredients
    common_items = [
        "milk",
        "wheat",
        "soy",
        "soybean",
        "egg",
        "eggs",
        "tree nuts",
        "peanut",
        "peanuts",
        "almond",
        "cashew",
        "walnut",
        "barley",
        "rye",
        "oats",
        "sesame"
    ]

    for item in common_items:
        text = text.replace(item, f", {item},")

    # Remove duplicate commas
    text = re.sub(r"\s*,\s*", ", ", text)
    text = re.sub(r",+", ",", text)

    return text.strip(" ,")


# -----------------------------
# Load Allergen Keywords
# -----------------------------
def load_allergens(csv_path):
    allergens = defaultdict(list)

    with open(csv_path, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        for row in reader:
            allergens[row["category"]].append(row["keyword"])

    return dict(allergens)

ALLERGENS = load_allergens(DATASET_DIR / "allergens.csv")

# -----------------------------
# Generate BERT Embeddings
# -----------------------------
def get_embedding(text):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)

    return outputs.last_hidden_state.mean(dim=1)

# -----------------------------
# Detect Allergens
# -----------------------------
def detect_allergens(ingredients, similarity_threshold=0.60):
    if isinstance(ingredients, list):
        text = " ".join(ingredients)
    else:
        text = ingredients

    detected = []

    text_embedding = get_embedding(text)

    for _, keywords in ALLERGENS.items():
        for keyword in keywords:

            # Exact match gets highest priority
            if keyword.lower() in text.lower():
                detected.append(keyword)
                continue

            # Semantic match
            # keyword_embedding = get_embedding(keyword)

            # similarity = torch.cosine_similarity(
            #     text_embedding,
            #     keyword_embedding
            # ).item()

            # if similarity >= similarity_threshold:
            #     detected.append(keyword)

    return sorted(set(detected))

def analyze_ingredient_image(image_path):
    text = extract_text(image_path)

    ingredients, contains_text = extract_ingredients(text)

    allergens = detect_allergens(
        " ".join(ingredients) + " " + contains_text
    )

    print("Ingredients:", ingredients)
    print("Contains:", contains_text)

    return ingredients, allergens