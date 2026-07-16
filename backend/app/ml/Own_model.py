import joblib

from pathlib import Path
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent.parent

MODEL_DIR = BASE_DIR / "models"

model = joblib.load(MODEL_DIR / "allergy_model.pkl")
vectorizer = joblib.load(MODEL_DIR / "vectorizer.pkl")


labels = [
    "peanut", "almond", "pistachio", "cashew",
    "milk", "butter", "cheese", "paneer", "ghee",
    "egg",
    "fish", "prawn",
    "moong dal", "chana dal",
    "tomato", "banana",
    "capsicum", "mushroom", "bitter gourd",
    "mustard",
    "chocolate",
    "chicken", "mutton"
]


def analyze_allergens(ingredients):

    # Convert ingredients to vector
    X = vectorizer.transform([ingredients])

    # Get prediction probabilities
    probs = model.predict_proba(X)[0]

    print("\nProbabilities:")
    for label, prob in zip(labels, probs):
        print(f"{label}: {prob:.4f}")

    # Set custom threshold
    threshold = 0.30

    detected = []

    # print("\nDetected Allergens:")
    for label, prob in zip(labels, probs):
        if prob >= threshold:
            detected.append(label)
            print(f"{label}: {prob:.4f} ✓")

    return detected
