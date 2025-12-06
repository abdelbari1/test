from fashion.api.fastapi.services import app
from fashion.api.fastapi.models.notification_model import NotificationIn, NotificationOut
from fashion.api.fastapi.transformers.notification_transformer import NotificationTransformer as nt
from typing import List
from fashion.models.notification import Notification

@app.get('/fashion/api/notifications/{uid}', response_model=List[NotificationOut], tags=['Notifications'])
async def get_all_user_notifications(uid: str):
    pass

@app.get('/fashion/api/notifications/role/{rl}', response_model=List[NotificationOut], tags=['Notifications'])
async def get_notifications_by_role(rl: str) -> List[NotificationOut]:
    pass

@app.patch('/fashion/api/notifications/{nid}', response_model=bool, tags=['Notifications'])
async def patch_sts_notification(nid: str, sts: str) -> bool:
    pass

@app.delete('/fashion/api/notifications/{nid}', response_model=bool, tags=['Notifications'])
async def delete_notification(nid: str) -> bool:
    pass