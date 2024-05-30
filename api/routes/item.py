from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, database
from ..controllers.item import ItemController

router = APIRouter()

item_controller = ItemController()

@router.post("/items/", response_model=schemas.item.Item)
def create_item(item: schemas.item.ItemCreate, db: Session = Depends(database.get_db)):
    return item_controller.create_item(db=db, item=item)

@router.get("/items/{item_id}", response_model=schemas.item.Item)
def read_item(item_id: int, db: Session = Depends(database.get_db)):
    return item_controller.get_item(db=db, item_id=item_id)

@router.get("/items/", response_model=list[schemas.item.Item])
def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    return item_controller.get_items(db=db, skip=skip, limit=limit)

@router.put("/items/{item_id}", response_model=schemas.item.Item)
def update_item(item_id: int, item: schemas.item.ItemCreate, db: Session = Depends(database.get_db)):
    return item_controller.update_item(db=db, item_id=item_id, item=item)

@router.delete("/items/{item_id}", response_model=schemas.item.Item)
def delete_item(item_id: int, db: Session = Depends(database.get_db)):
    return item_controller.delete_item(db=db, item_id=item_id)
