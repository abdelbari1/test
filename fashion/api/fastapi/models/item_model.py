from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Size(BaseModel):
    size: str
    quantity: int

class SizeIn(Size):
    pass

class SizeOut(Size):
    uid: str

class Item(BaseModel):
    item_name: str
    item_category: str
    gender: str
    flash_sale: Optional[int]
    actual_price: int
    currency: str
    item_model: Optional[str]
    reference: Optional[str]
    status: str
    description: str
    image_main: Optional[str]
    image_details: Optional[List[str]]
    user_id: str

class ItemIn(Item):
    sizes: List[SizeIn]

class ItemOut(Item):
    uid: str
    edited_price: int
    item_created: datetime
    sizes: List[SizeOut]