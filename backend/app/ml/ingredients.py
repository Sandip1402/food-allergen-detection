import pandas as pd
from pathlib import Path

# Resolve base directory and load Indian food ingredients dataset
BASE_DIR = Path(__file__).resolve().parents[2]
DATASET_DIR = BASE_DIR / "datasets"

df = pd.read_csv(DATASET_DIR / "food_data_alphabetically_sorted.csv")

# Retrieve ingredients for a given food name
def get_ingredients(food_name):
    result = df[df["Food_Name"].str.lower() == food_name.lower()]
    if not result.empty:
        return result.iloc[0]["Ingredients"]
    else:
        return None
