import './desk.css'
import {useState} from 'react'
import Menur from './menur'
const Desk = () =>{


    return(
        <div>
            <nav className='dnav'>
                <h3>رنـــد تــریـــد</h3>
                <img src={require('../home/02.png')} alt='Logo RoundTrade'></img>
            </nav>
            <Menur/>

        </div>
    )
}


export default Desk