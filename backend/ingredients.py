import pandas as pd

df = pd.read_csv("food_data.csv")

def get_ingredients(food_name):
    result = df[df["Food_Name"].str.lower() == food_name.lower()]
    if not result.empty:
        return result.iloc[0]["Ingredients"]
    else:
        return None

