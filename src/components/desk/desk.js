import './desk.css'


const Desk = () =>{

    return(
        <div>
            <nav className='dnav'>
                <button className='dmenu'><img src={require('./img/hmb.png')}></img></button>
                <h3>رنـــد تــریـــد</h3>
                <img src={require('../home/02.png')} alt='Logo RoundTrade'></img>
            </nav>
            میزکار

        </div>
    )
}


export default Desk