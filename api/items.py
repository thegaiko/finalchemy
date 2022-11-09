import requests
import json

def check_token(token):
    f = open('sample.json')
    data = json.load(f)
    tokens = []
    for i in data:
        tokens.append(i['token'])
    f.close()
    
    if token in tokens:
        return True
    else:
        return False

def get_news():
    url = "https://quote.ru/ajax/pro-investments/news"
    payload={}
    response = requests.request("GET", url, data=payload)
    result = response.json()['items']
    news = []
    for i in range(len(result)):
        news.append(
            {
                "text": result[i]['title'],
                "anons": result[i]['anons'],
                "link": result[i]['fronturl'],
                "author": result[i]['partner']['title'],
                "url": result[i]['image']['url'],
            }
        )
    return news

def get_trends():
    url = "https://quote.ru/v5/ajax/catalog/get-tickers?type=share&sort=leaders&limit=15&offset=0"
    payload={}
    response = requests.request("GET", url, data=payload)
    result = response.json()
    trends = []
    for i in range(9):
        trends.append(
            {
                "symbolRu": result[i]['company']['title'],
                "symbolEn": result[i]['title'],
                "logoLink": result[i]['company']['logo_link'],
                "profit": result[i]['price'],
                "profitProc": round(float(result[i]['exchange_price_percent']), 2)
            }
        )
    return trends


def get_currency():
    url = "https://www.rbc.ru/crypto/v2/ajax/key-indicator-update/?_=1667947724312"
    payload={}
    response = requests.request("GET", url, data=payload)
    result = response.json()['shared_key_indicators_under_topline']
    currency = []
    for value in result:
        currency.append({
            "symbol": value['item']['name'],
            "price": value['item']['closevalue'],
        })
    return currency

