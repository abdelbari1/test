from fashion.models.notification import Notification
from fashion.models.user import User
from fashion.models.item import Item
from typing import List


class NotificationProcessor:

    @staticmethod
    def create_notification(nt: Notification) -> Notification:
        pass

    @staticmethod
    def get_notification_by_user(uid: str) -> List[Notification]:
        pass

    @staticmethod
    def update_notification_sts(nid: str, sts: str) -> bool:
        pass

    @staticmethod
    def get_all_notification_by_user_role(url: str) -> List[Notification]:
        pass