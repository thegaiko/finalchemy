from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from triple_bundle import triple_bundle, double_bundle
from items import get_news, get_trends, get_currency, check_token

import uvicorn

processes = []
thread_author_list = []

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Triple_bundle_model(BaseModel):
    BANKS_LIST: list;
    ASSET_LIST: list;
    AMOUNT: int;
    
class Token_model(BaseModel):
    TOKEN: str;

@app.post("/api/check_token/")
async def request_bundle(model: Token_model):
    return check_token(model.TOKEN)

@app.post("/api/get_triple_bundle/")
async def request_bundle(model: Triple_bundle_model):
    return triple_bundle(model.BANKS_LIST, model.ASSET_LIST, model.AMOUNT)

@app.post("/api/get_double_bundle/")
async def request_bundle(model: Triple_bundle_model):
    return double_bundle(model.BANKS_LIST, model.ASSET_LIST, model.AMOUNT)

@app.get("/api/get_news/")
def read_item():
    return get_news()

@app.get("/api/get_trends/")
def read_item():
    return get_trends()

@app.get("/api/get_currency/")
def read_item():
    return get_currency()


if __name__ == '__main__':
    uvicorn.run("main:app",
                host="0.0.0.0",
                port=8000,
                reload=True,
                )
