# tests/test_main.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app
from database import Base, get_db

# Configurer une base de données SQLite en mémoire pour les tests
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Créer toutes les tables de la base de données
Base.metadata.create_all(bind=engine)

# Dépendance de base de données pour les tests
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module")
def setup_db():
    # Setup actions (if needed)
    yield
    # Teardown actions (if needed)
    Base.metadata.drop_all(bind=engine)

def test_create_item(setup_db):
    response = client.post("/api/v1/items/", json={"title": "Test Item", "description": "Test Description"})
    assert response.status_code == 200
    assert response.json()["title"] == "Test Item"
    assert response.json()["description"] == "Test Description"

def test_read_items(setup_db):
    response = client.get("/api/v1/items/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_item(setup_db):
    response = client.post("/api/v1/items/", json={"title": "Test Item", "description": "Test Description"})
    item_id = response.json()["id"]
    response = client.get(f"/api/v1/items/{item_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Test Item"
    assert response.json()["description"] == "Test Description"

def test_update_item(setup_db):
    response = client.post("/api/v1/items/", json={"title": "Test Item", "description": "Test Description"})
    item_id = response.json()["id"]
    response = client.put(f"/api/v1/items/{item_id}", json={"title": "Updated Item", "description": "Updated Description"})
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Item"
    assert response.json()["description"] == "Updated Description"

def test_delete_item(setup_db):
    response = client.post("/api/v1/items/", json={"title": "Test Item", "description": "Test Description"})
    item_id = response.json()["id"]
    response = client.delete(f"/api/v1/items/{item_id}")
    assert response.status_code == 200
    response = client.get(f"/api/v1/items/{item_id}")
    assert response.status_code == 404
