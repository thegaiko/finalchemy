import React, { useState, useRef } from "react"
import axios from 'axios'
import link from "../../../svg/link.svg"
import info from "../../../svg/info.svg"
import loadingSvg from "../../../svg/loadingSvg.svg"
import './Tripple.css'
import Header from "../../header/Header";
import {Link, useNavigate} from "react-router-dom";
import domain from '../../../config'

function Tripple() {
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState(true)

    const [bankList, setBankList] = useState(["TinkoffNew", "RosBankNew", "RaiffeisenBank", "QIWI"])
    const [symbolList, setSymbolList] = useState(["USDT", "BUSD", "BNB", "ETH", "BTC"])

    const inputRef = useRef(null);

    const [updated, setUpdated] = useState('');

    const handleClick = () => {
        setUpdated(inputRef.current.value);
    };

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    console.log(token)
    if (token === null){
        navigate('/')
    }

    React.useEffect(() => {
        const fetchData = async(bankList) => {
            try{
                const {data} = await axios.post('/api/get_triple_bundle/', {
                    "BANKS_LIST": ["TinkoffNew", "RosBankNew", "QIWI"],
                    "ASSET_LIST": ["USDT", "BTC", "BNB"],
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
            const {data} = await axios.post('/api/get_triple_bundle/', {
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
                <div className='littleLogoText'>Binance: Тройные связки</div>
                {loading && <div className='loadingText'><img src={loadingSvg}/></div>}
            </div>
            <div className='settingsBar'>
                <div>
                    <div className='depositBox'>
                        <input className='depositInput' placeholder="10000" ref={inputRef} type="num" id="message" name="message" />
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
                <div className='tableTitles'>
                    <div className='boyBoxHeader'>ПОКУПАЕМ НА P2P</div>
                    <div className='midBoxHeader'>ОБМЕНИВАЕМ НА SPOT</div>
                    <div className='boyBoxHeader'>ПРОДАЕМ НА P2P</div>
                    <div className='resultBoxHeader'>РЕЗУЛЬТАТ</div>
                </div>
                <div className='menuLine'></div>
            </div>

            <div className='bundleList'>
                <>
                    {company.map(company => (
                        <>
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

                                <div className='midBox'>
                                    <div className='priceText'>{company.other_info.middle_price}</div>
                                    <div className='boldText'>{company.buy_order.order.asset} - {company.sell_order.order.asset}</div>
                                    <div className='tinyText'> <br/> <img src={info} alt="" className='infoLogo'/> Обмениваем купленную {company.buy_order.order.asset} на {company.sell_order.order.asset}  <br/>на спотовом рынке</div>
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
                                <div className='resultBox'>
                                    <div className='priceText'>+{company.other_info.take_money_proc}%</div>
                                    <div className='tinyText'>Прибыль: {company.other_info.take_money} RUB</div>
                                </div>
                            </div>
                        </>
                    ))}
                </>
            </div>

        </div>
    );
}

export default Tripple;
