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
    return normalize_text(text)


def normalize_text(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


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


ALLERGENS = load_allergens(
    DATASET_DIR / "allergens.csv"
)


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
def analyze_allergens(text, similarity_threshold=0.60):
    if text is None:
        text = ""

    text = str(text)

    detected = {}

    text_embedding = get_embedding(text)

    for category, keywords in ALLERGENS.items():

        found = []

        for keyword in keywords:

            # Exact Match
            if re.search(rf"\b{re.escape(keyword)}\b", text):
                found.append(keyword)
                continue

            # Semantic Match
            keyword_embedding = get_embedding(keyword)

            similarity = torch.cosine_similarity(
                text_embedding,
                keyword_embedding
            ).item()

            if similarity >= similarity_threshold:
                found.append(keyword)

        if found:
            detected[category] = sorted(set(found))

    return detected