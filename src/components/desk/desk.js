import './desk.css'
import {useState} from 'react'
import Panlesaf from './saf'



const Desk = () =>{

    const [act, setAct] = useState('saf')
    const [actstyl, setActstyl] = useState(['bxmnclck','bxmn','bxmn','bxmn'])
    
    const switchAct = (a)=>{
        setAct(a)
        if(a==='saf'){
            setActstyl(['bxmnclck','bxmn','bxmn','bxmn'])
        }else if(a==='rng'){
            setActstyl(['bxmn','bxmnclck','bxmn','bxmn'])
        }else if(a==='nzr'){
            setActstyl(['bxmn','bxmn','bxmnclck','bxmn'])
        }else if(a==='vlm'){
            setActstyl(['bxmn','bxmn','bxmn','bxmnclck'])
        }
    }



    return(
        <div>
            <nav className='dnav'>
                <img src={require('../home/02.png')} alt='Logo RoundTrade'></img>
                <h3>رنـــد تــریـــد</h3>
            </nav>
            <main className='mainmenu'>
                <div className={actstyl[0]} onClick={()=>switchAct('saf')}>
                    <img src={require('./img/srkht.png')} alt='icon sarkhat'></img>
                    <h5>هشدار صف</h5>
                </div>
                <div className={actstyl[1]} onClick={()=>switchAct('rng')}>
                    <img src={require('./img/rang.png')} alt='icon sarkhat'></img>
                    <h5>هشدار رنج کشیدن</h5>
                </div>
                <div className={actstyl[2]} onClick={()=>switchAct('nzr')}>
                    <img src={require('./img/nazr.png')} alt='icon sarkhat'></img>
                    <h5>هشدار پیام ناظر</h5>
                </div>
                <div className={actstyl[3]} onClick={()=>switchAct('vlm')}>
                    <img src={require('./img/volm.png')} alt='icon sarkhat'></img>
                    <h5>هشدار حجم معاملات</h5>
                </div>
            </main>
            <Panlesaf act={act}/>
        </div>
    )
}


export default Desk