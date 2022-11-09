import './Header.css';
import Marquee from "react-fast-marquee";
import React, {useState} from "react";
import axios from "axios";

function Header() {
    const [currency, setCurrency] = useState([])
    React.useEffect(() => {
        const fetchData = async() => {
            try{
                const {data} = await axios.get('http://0.0.0.0:8000/api/get_currency/', )
                setCurrency(data)
            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <Marquee>
            {currency.map(currency => (
                <div className='currencyBox'>
                    <div className='symbol'>{currency.symbol}: </div>
                    <div className='price'>{currency.price}</div>
                </div>
            ))}
        </Marquee>
    );
}

export default Header;