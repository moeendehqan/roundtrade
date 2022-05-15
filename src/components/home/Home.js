import './home.css'
import {useState} from 'react'
import Login from './login'
import Desk from '../desk/desk'
import {setCookie, getCookie} from '../cookie/cookie'
import axios from 'axios'

const Home = () => {
    const [mode, setmode] = useState('home')
    const handleMode = (e,mode)=>{
        e.preventDefault()
        setmode(mode)
    }
    const cookiesetphone = getCookie('phone')
    if(cookiesetphone.length>0){
        axios({
            method: 'post',
            url: "http://localhost:5000/api/logincookie",
            data: {phone:cookiesetphone}
        }).then((response)=>{
            if (response.data.login === true){
                setmode('desk')
                setCookie('phone',cookiesetphone,10)
            }else{
                setCookie('phone',cookiesetphone,0)
            };
        }).catch((response)=>{console.log(response);}}



    if (mode==='home' || mode==='login'){
        return(
            <div>
                <nav className='hnav'>
                    <img src={require('./02.png')} alt='Logo RoundTrade'></img>
                    <h3>رنـــد تــریـــد</h3>
                    <button onClick={(e)=>handleMode(e,'login')}>ورود</button>
                </nav>
                <article className='hartcl'>
                    <Login mode={mode} hmod={handleMode}/>
                    <h2>هیچ تحرکی از چشمتان پنهان نخواهد ماند</h2>
    
                            <div className='mzlst'>
                                <img src={require('./q.png')} alt='تنظیم هشدار برای صفوف خرید و فروش'></img>
                                <span>صفوف خرید و فروش</span>
                            </div>
    
                            <div className='mzlst'>
                                <img src={require('./r.png')} alt='تنظیم هشدار برای رنج زدن سهم'></img>
                                <span>رنج زدن سهم</span>
                            </div>
    
                            <div className='mzlst'>
                                <img src={require('./m.png')} alt='تنظیم هشدار برای پیام ناظر'></img>
                                <span>پیام ناظر</span>
                            </div>
    
                            <div className='mzlst'>
                                <img src={require('./O.png')} alt='تنظیم هشدار برای بازگشایی و توقف'></img>
                                <span>بازگشایی و توقف</span>
                            </div>
    
    
                </article>
    
            </div>
            )}
    if(mode==='desk'){
        return(
            <div>
                <Desk/>
            </div>
        )
    }

}





export default Home