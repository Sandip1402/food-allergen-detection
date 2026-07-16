# model to be used for allergen detection
import joblib

model = joblib.load("allergy_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

food = ["peanut butter sandwich"]

food_vec = vectorizer.transform(food)

prediction = model.predict(food_vec)

print(prediction)