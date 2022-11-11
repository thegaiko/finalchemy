import asyncio
from binance import get_price, get_spot_price
from aiohttp import ClientSession
import nest_asyncio
from items import check_token

nest_asyncio.apply()

def double_bundle(banks, assets, amount):
    orders = []
    for asset in assets:
        buy_list = []
        for bank in banks:
            buy_list.append(asyncio.run(get_price(asset, bank, amount, "BUY")))
        sell_list = buy_list
        
        for buy_order in buy_list:
            for sell_order in sell_list:
                take_money = ((amount / buy_order['order']['price']) * sell_order['order']['price']) - amount
                if take_money > 10:
                    orders.append(
                        {
                            "buy_order": buy_order,
                            "sell_order": sell_order,
                            "other_info": {
                                "take_money": round(take_money, 2),
                                "take_money_proc": round(((take_money / amount) * 100), 2)
                            }
                        }
                    )
    array = sorted(orders, key=lambda student: student['other_info']['take_money'])
    array.reverse()

    return array
                
            
            
def triple_bundle(banks, assets, amount):
    buy_list = []
    for asset in assets:
        for bank in banks:
            buy_list.append(asyncio.run(get_price(asset, bank, amount, "BUY")))
    sell_list = buy_list

    spot_prices = {
        "BTCUSDT": asyncio.run(get_spot_price("BTCUSDT")),
        "BTCBUSD": asyncio.run(get_spot_price("BTCBUSD")),

        "BUSDUSDT": asyncio.run(get_spot_price("BUSDUSDT")),

        "BNBUSDT": asyncio.run(get_spot_price("BNBUSDT")),
        "BNBBTC": asyncio.run(get_spot_price("BNBBTC")),
        "BNBBUSD": asyncio.run(get_spot_price("BNBBUSD")),
        "BNBETH": asyncio.run(get_spot_price("BNBETH")),

        "ETHUSDT": asyncio.run(get_spot_price("ETHUSDT")),
        "ETHBTC": asyncio.run(get_spot_price("ETHBTC")),
        "ETHBUSD": asyncio.run(get_spot_price("ETHBUSD")),
    }

    orders = []
    for buy_order in buy_list:
        for sell_order in sell_list:
            buy_order_asset = buy_order['order']['asset']
            sell_order_asset = sell_order['order']['asset']

            try:
                middle_price = spot_prices[f"{buy_order_asset}{sell_order_asset}"]
                logic_type = 0
            except KeyError:
                try:
                    middle_price = spot_prices[f"{sell_order_asset}{buy_order_asset}"]
                    logic_type = 1
                except KeyError:
                    continue

                if logic_type == 1:
                    take_money = (((amount / buy_order["order"]["price"]) / float(middle_price)) * sell_order["order"][
                        "price"]) - amount
                else:
                    take_money = (((amount / buy_order["order"]["price"]) * float(middle_price)) * sell_order["order"][
                        "price"]) - amount

                orders.append(
                    {
                        "buy_order": buy_order,
                        "sell_order": sell_order,
                        "other_info": {
                            "middle_price": middle_price,
                            "take_money": round(take_money, 2),
                            "take_money_proc": round(((take_money / amount) * 100), 2)
                        }
                    }
                )

    array = sorted(orders, key=lambda student: student['other_info']['take_money'])
    array.reverse()

    return array
