import enum

class UserRole(str, enum.Enum):
    Admin = 'Admin'
    Client = 'Client'
    Coordinator = 'Coordinator'

class Gender(str, enum.Enum):
    Men = 'Men'
    Woman = 'Woman'
    Kids_Boy = 'Kids_Boy'
    Kids_Girl = 'Kids_Girl'

class ItemCategory(str, enum.Enum):
    Tshirt = 'Tshirt'
    Shirt = 'Shirt'
    Jeans = 'Jeans'
    Shoes = 'Shoes'
    Polo_Shirt = 'Polo_Shirt'
    Jacket = 'Jacket'
    Sweatshirt = 'Sweatshirt'
    Wallet = 'Wallet'
    Accessories = 'Accessories'
    Skirts = 'Skirts'
    Dresses = 'Dresses'
    Sneackers = 'Sneakers'
    Sport_Sweatshirt = 'Sport_Sweatshirts'
    Sport_Pants = 'Sport_Pants'
    Sport_Jacket = 'Sport_Jacket'
    Sport_Tshirt = 'Sport_Tshirt'
    Vest = 'Vest'
    Shorts ='Shorts'
    Socks = 'Socks'
    Belts = 'Belts'
    Perfumes = 'Perfumes'
    Watch = 'Watch'
    Sunglasses = 'Sunglasses'
    Sandals = 'Sandals'
    Hats = 'Hats'
    Coats = 'Coats'
    Sett = 'Sett'
    Body_Suits = 'Body_Suits'
    Trench_Coats = 'Trench_Coats'
    Heels = 'Heels'
    Handbags = 'Handbags'
    Suits = 'Suits'

    
    

class Sizes(str, enum.Enum):
    XS = 'XS'
    S = 'S'
    M = 'M'
    L = 'L'
    XL = 'XL'
    XXL = 'XXL'


class Currency(str, enum.Enum):
    USD = 'USD'
    LBP = 'LBP'

class StatusItem(str, enum.Enum):
    Available = 'Available'
    Sold_out = 'Sold Out'


class NotficationStatus(str, enum.Enum):
    CLOSE = 'CLOSE'
    OPEN = 'OPEN'

class NotficationStatusItem(str, enum.Enum):
    Wishlist = 'Wishlist'
    Purchase = 'Purchase'
    Delivery = 'Delivery'
    Sale = 'Sale'
    NewCollection = 'New Collection'

class RelationCardinality(str, enum.Enum):
    One_One = '1..1'
    One_Many = '1..n'

class PurchaseStatus(str, enum.Enum):
    Credit = 'Credit'
    Delivery = 'Delivery'

class PurchaseItemStatus(str, enum.Enum):
    Pending = 'Pending'
    Processing = 'Processing'
    Done = 'Done'

class Region(str, enum.Enum):
    Lebanon = 'Lebanon'

class SortSize(str, enum.Enum):
    XXS = 0
    XS = 1
    S = 2
    M = 3
    L = 4
    XL = 5
    XXL = 6
    XXXL = 7


    

        