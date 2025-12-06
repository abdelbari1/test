from fashion.models.basic_entity import BasicEntity
from fashion.models.domain import NotficationStatus, NotficationStatusItem
from fashion.models.user import User
from fashion.models.item import Item
from datetime import datetime

class Notification(BasicEntity):
    def __init__(self, uid: str = None, requester: User=None, reciever: User=None, item: Item=None, current_date: datetime=None,
                status: NotficationStatus.CLOSE=None, notification_status: NotficationStatusItem.Wishlist=None, comment: str=None):
        super().__init__(uid)
        self.__requester = requester
        self.__reciever = reciever
        self.__item = item
        self.__current_date = current_date
        self.__status = status
        self.__notification_sts = notification_status
        self.__comment = comment

    @property
    def requester(self) -> User:
        return self.__requester
    
    @requester.setter
    def requester(self, req: requester):
        self.__requester = req

    @property
    def reciever(self) -> User:
        return self.__reciever
    
    @reciever.setter
    def reciever(self, rec: User):
        self.__reciever = rec   

    @property
    def item(self) -> Item:
        return self.__item
    
    @item.setter
    def item(self, itm: Item):
        self.__item = itm

    @property
    def current_date(self) -> datetime:
        return self.__current_date
    
    @current_date.setter
    def current_date(self, cd: datetime):
        self.__current_date = cd

    @property
    def status(self) -> NotficationStatus:
        return self.__status
    
    @status.setter
    def status(self, ns: NotficationStatus):
        self.__status = ns

    @property
    def notification_status(self) -> NotficationStatusItem:
        return self.__notification_sts
    
    @notification_status.setter
    def notification_status(self, st: NotficationStatusItem):
        self.__notification_sts = st

    @property
    def comment(self) -> str:
        return self.__comment
    
    @comment.setter
    def comment(self, cmn: str):
        self.__comment = cmn



    