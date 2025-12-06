import psycopg2
from abc import abstractmethod


class ConnectionProvider:
    @abstractmethod
    def get_connection(self) -> psycopg2.extensions.connection:
        pass

    @abstractmethod
    def release_connection(self, cnt: psycopg2.extensions.connection) -> None:
        pass

    @abstractmethod
    def shutdown(self) -> None:
        pass
