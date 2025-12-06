import glob
from os.path import basename, dirname, isfile, join
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette_context import context, plugins
from starlette_context.middleware import RawContextMiddleware

modules = glob.glob(join(dirname(__file__), "*.py"))
__all__ = [basename(f)[:-3] for f in modules if isfile(f)
           and not f.endswith('__init__.py')]

print(__all__)

# __all__ = ['user_api', 'item_api', 'wishlist_api', 'notification_api']

# __all__ = [names of all files exist into services folder without the extension]


app = FastAPI(title="Fashion Backend", version="0.0.84")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(RawContextMiddleware, plugins=(
    plugins.RequestIdPlugin(force_new_uuid=True),
))
