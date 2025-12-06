from fashion.persistance.cnt.connection_provider import ConnectionProvider
import psycopg2.pool

class DefaultConnectionProvider(ConnectionProvider):

    def __init__(self, usr: str, pwd: str, host: str='localhost', database: str='postgres', port: int=5432, schema: str='postgres'):
        self.__pool = psycopg2.pool.SimpleConnectionPool(1, 20, user=usr, password=pwd, host=host, port=str(port), database=database,
                                                        options=f'-c search_path={schema}')
        print(self.__pool.getconn().status)
        
    def get_connection(self) -> psycopg2.extensions.connection:
        return self.__pool.getconn()
    
    def release_connection(self, cnt: psycopg2.extensions.connection) -> None:
        self.__pool.putconn(cnt)

    def shutdown(self) -> None:
        self.__pool.closeall()