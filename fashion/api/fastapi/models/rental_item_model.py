from pydantic import BaseModel
from datetime import datetime

from fashion.api.fastapi.models.delivery_model import DeliveryOut
from fashion.api.fastapi.models.item_model import ItemOut, SizeOut
from fashion.api.fastapi.models.user_model import UserOut

class RentalItem(BaseModel):
    nb_of_days: int
    rental_price: int
    currency: str


class RentalItemIn(RentalItem):
    item_id: str

class RentalItemOut(RentalItem):
    uid: str
    item: ItemOut


class BookedItem(BaseModel):
    requested_start_date: datetime
    duration: int
    owner_id: str

class BookedItemIn(BookedItem):
    rental_item_id: str
    size_id: str
    user_id: str
    delivery_id: str

class BookedItemOut(BookedItem):
    uid: str
    requested_end_date: datetime
    rental_item: RentalItemOut
    size: SizeOut
    user: UserOut
    delivery: DeliveryOut