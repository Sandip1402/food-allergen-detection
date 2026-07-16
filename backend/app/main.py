from fastapi import FastAPI
from app.api.analyze import router

app = FastAPI(
    title="Food Allergy Detection API"
)

app.include_router(router)