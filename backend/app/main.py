from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.analyze import router

app = FastAPI(
    title="Food Allergy Detection API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # okay for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)