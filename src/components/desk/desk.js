import './desk.css'
import {useState} from 'react'
import Menur from './menur'
const Desk = () =>{
    const [menumode, setMenumode] = useState(false)
    const swochemenumode = ()=>{setMenumode(!menumode)}

    return(
        <div>
            <nav className='dnav'>
                <button className='dmenu'><img src={require('./img/hmb.png')}></img></button>
                <h3>رنـــد تــریـــد</h3>
                <img src={require('../home/02.png')} alt='Logo RoundTrade'></img>
            </nav>
            <Menur menumode={menumode} />

        </div>
    )
}


export default Desk