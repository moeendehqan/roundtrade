import './desk.css'
import {useState} from 'react'
import Menur from './menur'
const Desk = () =>{

    const [munemode, setMenumode] = useState(false)
    const sowchemunemode = ()=>{setMenumode(!munemode)}
    console.log(munemode)

    return(
        <div>
            <nav className='dnav'>
            <button className='dmenu' onClick={(e)=>sowchemunemode()}><img src={require('./img/hmb.png')}></img></button>
                <h3>رنـــد تــریـــد</h3>
                <img src={require('../home/02.png')} alt='Logo RoundTrade'></img>
            </nav>
            <Menur munemode={munemode} />

        </div>
    )
}


export default Desk