import './Auth.css';
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import btnIcon from "../../svg/authButton.png"
import domain from '../../config'
import axios from "axios";

function Auth() {
    const [token, setToken] = useState()

    const navigate = useNavigate()

    const fetchData = async(token) => {
        try{
            const {data} = await axios.post('api/check_token/', {
                "TOKEN": token
            })
            console.log(data)
            if (data === true){
                localStorage.setItem("token", token)
                navigate('/home')
            }

        } catch(error) {
            console.log(error)
        }
        
    }

    const handler = (event) => {
        console.log(event)
        if (event.key === 'Enter'){
            fetchData(token);
        }
    }

    return (
        <div className='authPage'>
            <div className='tokenBox'>
                <div className='logoBar'>
                    <div className='logo'>Ф</div>
                    <div className='logoBoxText'>финансовая <br/>алхимия</div>
                </div>
                <div className='inputTyping'>
                    <input className='tokenInput' placeholder='Введите ваш токен.'  value={token} onChange={event => setToken(event.target.value)} type="num" id="message" name="message" />
                    <button className='authBtnBox' onKeyDown={(e) => handler(e)} onClick={() => fetchData(token)}>
                        <img className='authBtn' src={btnIcon} alt="" />
                    </button>
                </div> 
            </div>
        </div>
    );
}

export default Auth;
