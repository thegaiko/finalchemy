from pprint import pprint
import aiohttp
import asyncio
from aiohttp import ClientSession

import requests


async def get_spot_price(asset):
    url = f'https://api.binance.com/api/v3/avgPrice?symbol={asset}'

    async with ClientSession(trust_env=True) as session:
        async with session.get(url, ssl=False) as resp:
            result = await resp.json()
    
    return result['price']

async def get_price(asset, bank, transAmount, tradeType):
    
    url = f'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search'

    async with ClientSession(trust_env=True) as session:
        async with session.post(url, json={
                            "asset": asset,
                            "fiat": "RUB",
                            "merchantCheck": False,
                            "page": 1,
                            "payTypes": [bank],
                            "publisherType": None,
                            "rows": 1,
                            "tradeType": tradeType,
                            "transAmount": int(transAmount),
                        }, ssl=False) as resp:
            adv = await resp.json()
            adv = adv['data'][0]

    pprint(adv)
    bankList = []
    for bank in adv['adv']['tradeMethods']:
        bankList.append(bank['tradeMethodName'])
    userNo = adv['advertiser']['userNo']
    return {
        "order": {
            "asset": adv['adv']['asset'],
            "price": round(float(adv['adv']['price']), 2),
            "suply": adv['adv']['surplusAmount'],
            "max": adv['adv']['maxSingleTransAmount'],
            "min": adv['adv']['minSingleTransAmount'],
            "bank": bankList,
        },
        "user": {
            "link": f'https://p2p.binance.com/ru/advertiserDetail?advertiserNo={userNo}',
            "nick": adv['advertiser']['nickName'],
            "orders": adv['advertiser']['monthOrderCount'],
            "rate": adv['advertiser']['monthFinishRate'] * 100,
        }
    }