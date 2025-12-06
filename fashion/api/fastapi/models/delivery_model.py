from pydantic import BaseModel
from typing import Optional
from fashion.api.fastapi.models.user_model import UserOut

class Delivery(BaseModel):
    region: str
    address: str
    appartment: str
    city: str
    postcode: Optional[str]
    phone: str
    save: bool

class DeliveryIn(Delivery):
    user_id: str

class DeliveryOut(Delivery):
    uid: str
    user: UserOut