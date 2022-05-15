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
            <main className='mainmenu'>
                <div className='bxmn'>
                    <img className='iconmenu' src={require('./img/srkht.png')}></img>
                    <h5 className='bxtitl'>هشدار صف</h5>
                </div>
            </main>

        </div>
    )
}


export default Desk