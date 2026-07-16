import pandas as pd

# 1. Load dataset
df = pd.read_csv("food_data.csv")

# 2. Set the target column (Change "Ingredients" to your actual text column name)
target_column = "Ingredients" 

# 3. Clean the text column
df[target_column] = df[target_column].fillna("").str.lower()

# 4. Clean list of unique allergens
allergens = [
    "Peanut", "Almond", "Pistachio", "Cashew",
    "Milk", "Butter", "Cheese", "Paneer", "Ghee",
    "Egg",
    "Fish", "Prawn",
    "Moong dal", "Chana dal",
    "Tomato", "Banana",
    "Capsicum", "Mushroom", "Bitter gourd",
    "Mustard",
    "Chocolate",
    "Chicken", "Mutton"
            ]

# 5. Create binary 1 or 0 columns
for allergen in allergens:
    # .contains() returns True/False. .astype(int) converts True->1 and False->0
    df[allergen] = df[target_column].str.contains(allergen).astype(int)

# 6. Keep and save required columns
result = df[["Food_Name"] + allergens]
result.to_csv("modified_food_allergen.csv", index=False)

print(result.head())
