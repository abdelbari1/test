from pydantic import BaseModel
from fashion.api.fastapi.models.item_model import ItemOut
from typing import List, Optional

class WishList(BaseModel):
    user_id: str

class WishListIn(WishList):
    item_id: str

class WishListOut(WishList):
    items: List[ItemOut]
    