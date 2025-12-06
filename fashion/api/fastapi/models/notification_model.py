from pydantic import BaseModel
from datetime import datetime

from fashion.api.fastapi.models.item_model import ItemOut


class Notification(BaseModel):
    requestor: str
    reciever: str
    notification_status: str
    comment: str

class NotificationIn(Notification):
    item_id: str

class NotificationOut(Notification):
    uid: str
    item: ItemOut
    current_date: datetime
    sts: str