from fashion.api.fastapi.services import app
from fashion.api.fastapi.models.user_model import UserOut
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi import Depends, HTTPException, status
from fashion.processors.user_processor import UserProcessor as up
from fashion.api.fastapi.transformers.user_transformer import UserTransformer as ut

security = HTTPBasic()

@app.get("/fashion/api/login", response_model=UserOut, tags=['Login'])
async def login(credentials: HTTPBasicCredentials = Depends(security)):
    user = up.get_user_by_creds(credentials.username, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    res = ut.user_b2p(user)
    return res