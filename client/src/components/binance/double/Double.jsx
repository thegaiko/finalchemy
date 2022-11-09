import React, { useState, useRef } from "react"
import axios from 'axios'
import link from "../../../svg/link.svg"
import info from "../../../svg/info.svg"
import loadingSvg from "../../../svg/loadingSvg.svg"
import './Double.css'
import Header from "../../header/Header";
import {Link} from "react-router-dom";

function Double() {
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState(true)

    const [bankList, setBankList] = useState([])
    const [symbolList, setSymbolList] = useState([])

    const inputRef = useRef(null);

    const [updated, setUpdated] = useState('');

    const handleClick = () => {
        setUpdated(inputRef.current.value);
    };

    React.useEffect(() => {
        const fetchData = async(bankList) => {
            try{
                const {data} = await axios.post('http://0.0.0.0:8000/api/get_double_bundle/', {
                    "BANKS_LIST": ["TinkoffNew", "RosBankNew", "RaiffeisenBank", "QIWI"],
                    "ASSET_LIST": ["USDT", "BTC", "BNB", "ETH", "BUSD"],
                    "AMOUNT": 10000
                })

                setCompany(data)

            } catch(error) {
                console.log(error)
            }

            setLoading(false)
        }
        fetchData()
    }, [])

    const fetchData = async(bankList, symbolList) => {
        handleClick()
        setLoading(true)
        try{
            const {data} = await axios.post('http://0.0.0.0:8000/api/get_triple_bundle/', {
                "BANKS_LIST": bankList,
                "ASSET_LIST": symbolList,
                "AMOUNT": updated
            })

            setCompany(data)

        } catch(error) {
            console.log(error)
        }

        setLoading(false)
    }

    const addBankList = (bankName) => {
        let index = bankList.indexOf(bankName)
        if (index === -1){
            setBankList(prev => [...prev, bankName])
            console.log(bankList)
        }
        else {
            setBankList(prev => prev.splice(0, index))
            console.log(bankList)
        }
    }

    const clearBankList = () => {
        setBankList([])
        setSymbolList([])
    }

    const addSymbolList = (symbolName) => {
        let index = symbolList.indexOf(symbolName)
        if (index === -1){
            setSymbolList(prev => [...prev, symbolName])
            console.log(symbolList)
        }
        else {
            setBankList(prev => prev.splice(0, index))
            console.log(symbolList)
        }
    }


    return (
        <div>
            <Header />
            <div className='menuLine'></div>
            <div className='logoBox'>
                <Link to={'/home'}><div className='bigLogoText'>Финансовая алхимия</div></Link>
                <div className='littleLogoText'>Binance: Двойные связки</div>
                {loading && <div className='loadingText'><img src={loadingSvg}/></div>}
            </div>
            <div className='settingsBar'>
                <div>
                    <div className='depositBox'>
                        <input className='depositInput' ref={inputRef} type="num" id="message" name="message" />
                        <div className='lowTitle'>Введите ваш депозит *по умолчанию 10.000</div>
                        <div className='buttonBox'>
                            <button className='acceptButton' onClick={() => fetchData(bankList, symbolList)}>Применить</button>
                            <button className='declineButton' onClick={() => clearBankList()}>Очистить</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='settingsBox'>
                        <div className='settingTagsBox'>
                            <button className='passiveBank' onClick={() => addBankList("TinkoffNew")}>Тинькофф</button>
                            <button className='passiveBank' onClick={() => addBankList("RosBankNew")}>Росбанк</button>
                            <button className='passiveBank' onClick={() => addBankList("RaiffeisenBank")}>Райффайзен</button>
                            <button className='passiveBank' onClick={() => addBankList("QIWI")}>QIWI</button>
                        </div>
                        <div className='lowTitle'>Выберите необходимые способы оплаты  *по умолчанию выбраны все </div>
                        <div className='filterBox'>
                            {bankList.map(bank => (
                                <div className='activeBank'>{bank}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='settingsBox'>
                        <div className='settingTagsBox'>
                            <button className='passiveBank' onClick={() => addSymbolList("USDT")}>USDT</button>
                            <button className='passiveBank' onClick={() => addSymbolList("BUSD")}>BUSD</button>
                            <button className='passiveBank' onClick={() => addSymbolList("BNB")}>BNB</button>
                            <button className='passiveBank' onClick={() => addSymbolList("ETH")}>ETH</button>
                            <button className='passiveBank' onClick={() => addSymbolList("BTC")}>BTC</button>
                        </div>
                        <div className='lowTitle'>Выберите препочитаемые для торговли валюты  *по умолчанию выбраны все</div>
                        <div className='filterBox'>
                            {symbolList.map(symbol => (
                                <div className='activeBank'>{symbol}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='doubleTableTitles'>
                    <div className='menuText'>ПОКУПАЕМ НА P2P</div>
                    <div className='menuText'>ПРОДАЕМ НА P2P</div>
                    <div className='menuText'>РЕЗУЛЬТАТ</div>
                </div>
                <div className='menuLine'></div>
            </div>

            <div className='doubleBundleList'>
                {company.map(company => (
                    <div>
                        <div className='buyLine'>
                            <div className='buyBox'>
                                <div className='priceBox'>
                                    <div className='priceText'>{company.buy_order.order.price}</div>
                                    <div className='tinyText'>{company.buy_order.order.asset}({company.buy_order.order.bank})</div>
                                    <div className='tinyText'><br/>В фиате: {company.buy_order.order.suply} {company.buy_order.order.asset}</div>
                                    <div className='tinyText'>Лимиты: {company.buy_order.order.min} - {company.buy_order.order.max}</div>
                                </div>
                                <div>
                                    <div className='linkBox' >
                                        <img src={link} className='nicknameLogo'/>
                                        <a className='boldText' href={company.buy_order.user.link} target="_blank" rel="noopener noreferrer" >{company.buy_order.user.nick}</a>
                                    </div>
                                    <div className='tinyText'>Количество следок: {company.buy_order.user.orders}({company.buy_order.user.rate}%)</div>
                                </div>
                            </div>


                            <div className='buyBox'>
                                <div className='priceBox'>
                                    <div className='priceText'>{company.sell_order.order.price}</div>
                                    <div className='tinyText'>{company.sell_order.order.asset}({company.sell_order.order.bank})</div>
                                    <div className='tinyText'><br/>В фиате: {company.sell_order.order.suply} {company.sell_order.order.asset}</div>
                                    <div className='tinyText'>Лимиты: {company.sell_order.order.min} - {company.sell_order.order.max}</div>
                                </div>
                                <div>
                                    <div className='linkBox' >
                                        <img src={link} className='nicknameLogo'/>
                                        <a className='boldText' href={company.sell_order.user.link} target="_blank" rel="noopener noreferrer" >{company.sell_order.user.nick}</a>
                                    </div>
                                    <div className='tinyText'>Количество следок: {company.sell_order.user.orders}({company.sell_order.user.rate}%)</div>
                                </div>
                            </div>
                            <div className='tableInLine'></div>
                            <div className='resultBox'>
                                <div className='priceText'>+{company.other_info.take_money_proc}%</div>
                                <div className='tinyText'>Прибыль: {company.other_info.take_money} RUB</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Double;
