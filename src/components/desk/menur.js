import {useState} from 'react'

const Menur = (props)=>{
    const menumode = props.menumode

    return(
        <div>
            <div className='menur'>
            <button className='dmenu'><img src={require('./img/hmb.png')}></img></button>

            </div>
            
        </div>
    )
}


export default Menur