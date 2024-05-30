from fastapi import FastAPI
from .database import engine
from .models import item as item_model
from .routes import item as item_route
from .logging_config import setup_logging

# Configurer le logging
setup_logging()

item_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(item_route.router, prefix="/api/v1", tags=["items"])
