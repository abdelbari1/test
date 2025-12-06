from fashion.models.notification import Notification
from fashion.api.fastapi.models.notification_model import NotificationOut, NotificationIn
from fashion.models.domain import NotficationStatusItem as nsi
from fashion.api.fastapi.transformers.item_transformer import ItemTransformer as it

class NotificationTransformer:

    @staticmethod
    def notification_b2p(nt: Notification) -> NotificationOut:
        item = it.item_b2p(nt.item)
        return NotificationOut(uid=nt.uid, requestor=nt.requester.uid, reciever=nt.reciever.uid, notification_status=nt.notification_status,
                               comment=nt.comment, current_date=nt.current_date, sts=nt.status, item=item)
    
    @staticmethod
    def notification_p2b(nt: NotificationIn) -> Notification:
        return Notification(notification_status=nsi._value2member_map_.get(nt.notification_status), comment=nt.comment)