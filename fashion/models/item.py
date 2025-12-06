from fashion.models.basic_entity import BasicEntity
from typing import List
from fashion.models.domain import ItemCategory, Gender, Currency, StatusItem
from datetime import datetime
from fashion.models.sizes import Sizes
from fashion.models.user import User

class Item(BasicEntity):
    def __init__(self, uid: str = None, item_name: str=None, sizes:List[Sizes]=None, item_category: ItemCategory.Tshirt=None,
                gender:Gender.Men=None, actual_price: int=None, currency:Currency.USD=None, status_item: StatusItem.Available=None,
                flash_sale: int=0, description: str=None, item_model: str=None, reference: str=None, image_main: str=None, image_details: List[str]=None,
                item_created: datetime=datetime.today(), user: User=None):
        super().__init__(uid)
        self.__item_name = item_name
        self.__sizes = sizes if sizes is not None else []
        self.__item_category = item_category
        self.__gender = gender
        self.__actual_price = actual_price
        self.__currency = currency
        self.__status_item = status_item
        self.__flash_sale = flash_sale
        self.__edited_price = 0 if self.__flash_sale is None or self.__flash_sale == 0 else self.__actual_price * ((100 - self.__flash_sale) / 100)
        self.__description = description
        self.__item_model = item_model
        self.__reference = reference
        self.__image_main = image_main
        self.__image_details = image_details
        self.__item_created = item_created
        self.__user = user


    @property
    def user(self) -> User:
        return self.__user
    
    @user.setter
    def user(self, u: User):
        self.__user = u

    @property
    def image_main(self) -> str:
        return self.__image_main
    
    @image_main.setter
    def image_main(self, i: str):
        self.__image_main = i

    @property
    def image_details(self) -> List[str]:
        return self.__image_details
    
    @image_details.setter
    def image_details(self, i: List[str]):
        self.__image_details = i

    def add_image_details(self, img: str):
        self.__image_details.append(img)

    @property
    def item_name(self) -> str:
        return self.__item_name
    
    @item_name.setter
    def item_name(self, item: str):
        self.__item_name = item

    @property
    def sizes(self) -> List[Sizes]:
         return self.__sizes

    @sizes.setter
    def sizes(self, sz: List[Sizes]):
         self.__sizes = sz

    def add_size(self, siz: Sizes):
        self.__sizes.append(siz)

    @property
    def item_category(self) -> ItemCategory:
        return self.__item_category
    
    @item_category.setter
    def item_category(self, it: ItemCategory):
         self.__item_category = it

    @property
    def gender(self) -> Gender:
        return self.__gender
    
    @gender.setter
    def gender(self, ct: Gender):
         self.__gender = ct
    
    @property
    def actual_price(self) -> int:
        return self.__actual_price
    
    @actual_price.setter
    def actual_price(self, ac: int):
         self.__actual_price = ac
    
    @property
    def currency(self) -> Currency:
        return self.__currency
    
    @currency.setter
    def currency(self, curr: currency):
         self.__currency = curr
    
    @property
    def status_item(self) -> StatusItem:
        return self.__status_item
    
    @status_item.setter
    def status_item(self, si: StatusItem):
         self.__status_item = si
        
    @property
    def flash_sale(self) -> int:
        return self.__flash_sale
    
    @flash_sale.setter
    def flash_sale(self, fs: int):
        self.__flash_sale = fs

    @property
    def edited_price(self) -> float:
        return self.__edited_price
    
    @edited_price.setter
    def edited_price(self, ep: float):
        self.__edited_price = ep 
    
    @property
    def description(self) -> str:
        return self.__description
    
    @description.setter
    def description(self, ds: str):
        self.__description = ds

    @property
    def item_model(self) -> str:
        return self.__item_model
    
    @item_model.setter
    def item_model(self, im: str):
        self.__item_model = im

    @property
    def reference(self) -> str:
        return self.__reference
    
    @reference.setter
    def reference(self, ref: str):
        self.__reference = ref

    @property
    def item_created(self) -> datetime:
        return self.__item_created

    @item_created.setter
    def item_created(self, ic: datetime):
        self.__item_created = ic  
  
    def find_size_by_id(self, sid: str) -> Sizes:
        if any((res:=siz).uid == sid for siz in self.__sizes):
            return res
        return None

        
   
        

    


 

