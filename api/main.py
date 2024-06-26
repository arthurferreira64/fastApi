from fastapi import FastAPI
from api.database import engine
from api.models import item as item_model
from api.routes import item as item_route
from api.logging_config import setup_logging
from fastapi.middleware.cors import CORSMiddleware

# Configurer le logging
setup_logging()

item_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  # origine frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(item_route.router, prefix="/api/v1", tags=["items"])
