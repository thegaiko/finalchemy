import './Auth.css';
import React, {useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Auth() {
    const [result, setResult] = useState([])

    const inputRef = useRef(null);
    const [updated, setUpdated] = useState('');
    
    const navigate = useNavigate()

    const handleClick = () => {
        setUpdated(inputRef.current.value);
    };

    const fetchData = async(token) => {
        handleClick()
        try{
            const {data} = await axios.post('http://0.0.0.0:8000/api/check_token/', {
                "TOKEN": token
            })
            setResult(data)

        } catch(error) {
            console.log(error)
        }
        console.log(result)
        if (result === true){
            navigate('/home')
        }
        
    }

    return (
        <div>
            <div className='menuPart'>
                <div className='logoText'>Финансовая алхимия</div>

                <div className='lowText'>Авторизация</div>
                <input className='depositInput' ref={inputRef} type="num" id="message" name="message" />

                <button className='normalText' onClick={() => fetchData(updated)}>Войти</button>
            </div>
        </div>
    );
}

export default Auth;
