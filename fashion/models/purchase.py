from fashion.models.basic_entity import BasicEntity
from fashion.models.delivery import Delivery
from fashion.models.item import Item
from fashion.models.request_line import RequestLine
from fashion.models.user import User
from typing import List
from fashion.models.domain import PurchaseStatus, PurchaseItemStatus
from datetime import datetime


class Purchase(BasicEntity):

    def __init__(self, uid: str=None, buyer:User=None, seller:User=None, lines: List[RequestLine]=None,
                purchase_status:PurchaseStatus=PurchaseStatus.Delivery, purchase_date:datetime=datetime.now(),
                purchase_item_status: PurchaseItemStatus=PurchaseItemStatus.Pending, delivery: Delivery=None):
        super().__init__(uid)
        self.__buyer = buyer
        self.__seller = seller
        self.__lines  = lines
        self.__purchase_status = purchase_status
        self.__purchase_date = purchase_date
        self.__purchase_item_status = purchase_item_status
        self.__delivery = delivery

    @property
    def delivery(self) -> Delivery:
        return self.__delivery
    
    @delivery.setter
    def delivery(self, d: Delivery):
        self.__delivery = d

    @property
    def purchase_item_status(self) -> PurchaseItemStatus:
        return self.__purchase_item_status
    
    @purchase_item_status.setter
    def purchase_item_status(self, pis: PurchaseItemStatus):
        self.__purchase_item_status = pis

    @property
    def buyer(self) -> User:
        return self.__buyer
        
    @buyer.setter
    def buyer(self, buy: User):
        self.__buyer = buy

    @property
    def seller(self) ->  User:
        return self.__seller
        
    @seller.setter
    def seller(self, sel: User):
        self.__seller = sel

    @property
    def lines(self) -> List[RequestLine]:
        return self.__lines
        
    @lines.setter
    def lines(self, it: List[RequestLine]):
        self.__lines = it

    def add_request_line(self, rl: RequestLine):
        self.__lines.append(rl)

    @property
    def purchase_status(self) -> PurchaseStatus:
        return self.__purchase_status
        
    @purchase_status.setter
    def purchase_status(self, ps: PurchaseStatus):
        self.__purchase_status = ps        

    @property
    def purchase_date(self) -> datetime:
        return self.__purchase_date
        
    @purchase_date.setter
    def purchase_date(self, pd: datetime):
        self.__purchase_date = pd




   
  