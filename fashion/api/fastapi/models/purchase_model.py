from pydantic import BaseModel
from fashion.api.fastapi.models.delivery_model import DeliveryOut
from fashion.api.fastapi.models.item_model import ItemOut
from typing import List, Optional
from datetime import datetime

from fashion.api.fastapi.models.user_model import UserOut

class RequestLine(BaseModel):
   size: str
   quantity: int

class RequestLineIn(RequestLine):
   item_id: str

class Purchase(BaseModel):
    purchase_status: str

class PurchaseIn(Purchase):
  buyer:str
  seller:str
  request_lines: List[RequestLineIn]
  delivery: str

class RequestLineOut(RequestLine):
   item: ItemOut

class PurchaseOut(Purchase):
  uid:str
  purcahse_date:datetime
  purchase_item_status: str
  buyer: UserOut
  seller: UserOut
  delivery: DeliveryOut
  request_lines: List[RequestLineOut]
