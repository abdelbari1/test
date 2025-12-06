

class BasicEntity:

    def __init__(self, uid:str=None):
        self.__uid = uid

    @property
    def uid(self) -> str:
        return self.__uid
    
    @uid.setter
    def uid(self, id: str):
        self.__uid = id

    def __eq__(self, other) -> bool:
        if isinstance(other, BasicEntity):
            if self.__uid is None or other.uid is None:
                return False
            return self.__uid == other.uid
        else:
            return False

    def __ne__(self, other) -> bool:
        return not self.__eq__(other)

    def __hash__(self):
        return hash(self.__uid)