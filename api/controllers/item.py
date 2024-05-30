import logging
from sqlalchemy.orm import Session
from fastapi import HTTPException
from .. import models
from ..schemas import item as item_schema

logger = logging.getLogger(__name__)

class ItemController:
    def get_item(self, db: Session, item_id: int):
        logger.info(f"Fetching item with id {item_id}")
        item = db.query(models.item.Item).filter(models.item.Item.id == item_id).first()
        if not item:
            logger.error(f"Item with id {item_id} not found")
            raise HTTPException(status_code=404, detail="Item not found")
        return item

    def get_items(self, db: Session, skip: int = 0, limit: int = 10):
        logger.info(f"Fetching items with skip={skip} and limit={limit}")
        return db.query(models.item.Item).offset(skip).limit(limit).all()

    def create_item(self, db: Session, item: item_schema.ItemCreate):
        logger.info(f"Creating item with title={item.title}")
        db_item = models.item.Item(**item.dict())
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item

    def update_item(self, db: Session, item_id: int, item: item_schema.ItemCreate):
        logger.info(f"Updating item with id {item_id}")
        db_item = self.get_item(db, item_id)
        if not db_item:
            logger.error(f"Item with id {item_id} not found for update")
            raise HTTPException(status_code=404, detail="Item not found")
        for key, value in item.dict().items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
        return db_item

    def delete_item(self, db: Session, item_id: int):
        logger.info(f"Deleting item with id {item_id}")
        db_item = self.get_item(db, item_id)
        if not db_item:
            logger.error(f"Item with id {item_id} not found for deletion")
            raise HTTPException(status_code=404, detail="Item not found")
        db.delete(db_item)
        db.commit()
        return db_item
