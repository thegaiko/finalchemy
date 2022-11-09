import './Navbar.css';
import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import loadingSvg from "../../svg/loadingSvg.svg";
import Header from "../header/Header";

function Navbar() {
        const [news, setNews] = useState([])
        const [loading, setLoading] = useState(true)

        React.useEffect(() => {
                const fetchData = async() => {
                        try{
                                const {data} = await axios.get('http://0.0.0.0:8000/api/get_news/', )
                                setNews(data)
                        } catch(error) {
                                console.log(error)
                        }
                        setLoading(false)
                }
                fetchData()
        }, [])
    return (
        <div>
            <Header/>
            <div className='Navbar'>
                <div className='menuPart'>
                            <div className='logoText'>Финансовая алхимия</div>

                            <div className='lowText'>Сборники информации</div>
                            <div className='normalText'>Новости</div>
                            <div className='normalText'>Статьи</div>

                            <div className='lowText'>Криптовалюта</div>
                            <div className='normalText'>Калькулятор</div>
                            <div className='normalText'>Монитор курсов</div>
                            <Link to={'/binance/tripple'}><div className='normalText'>Binance: Тройные связки</div></Link>
                            <Link to={'/binance/double'}><div className='normalText'>Binance: Двойные связки</div></Link>

                            <div className='lowText'>Фондовый рынок</div>
                            <div className='normalText'>Акции</div>
                            <div className='normalText'>Монитор</div>

                            <div className='lowText'>Другое</div>
                            <div className='normalText'>О проекте</div>
                    </div>
                    <div  className='newsBox'>
                            {loading && <div className='newsLoadingText'><img src={loadingSvg}/></div>}
                            {news.map(news => (
                                <div>
                                        <div className='postTitle'><a href={news.link} target="_blank" rel="noopener noreferrer" >{news.text}: </a></div>
                                        <div className='postAnons'>{news.author}</div>
                                        <div><img src={news.url} alt="" className='postImage' /></div>
                                        <div className='postAnons'>{news.anons}</div>
                                        <div className='newsLine'></div>
                                </div>
                            ))}
                    </div>
            </div>
    </div>
    );
}

export default Navbar;
