import {useState} from 'react'

const Menur = (props)=>{
    const menumode = props.menumode

    return(
        <div>
            <div className='menur'>
                <img src={require('../home/02.png')} alt='Logo RoundTrade'></img>

            </div>
            
        </div>
    )
}


export default Menur