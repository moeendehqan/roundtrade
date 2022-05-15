import { useState } from "react"
const Panlesaf = (props)=>{
    const [bs,setbs]=useState('buy')
    const handleBs = (b) =>{
        setbs(b)
    }
    

    if(props.act==='saf'){
        return(
            <div className="pnlsaf">
                <div className="preface">
                    <h2>ایجاد هشدار برای صف های خرید و فروش</h2>
                    <h5>این قسمت به شما این امکان را میدهد که از نماد های که برای آنها صف خرید یا فروش ایجاد شده یا در استانه شکل گیری و یا حتی در استانه جمع شدن صف هستند بلافاصله مطلع شوید</h5>
                    <ul>
                        <li>تنظیم هشدار برای نماد در صورت شکل گیری صف خرید و فروش</li>
                        <li>تنظیم هشدار برای نماد در صورت صف خرید و فروش تضعیف شده</li>
                        <li>تنظیم هشدار برای نماد در صورت که در آستانه صف خرید یا فروش باشد</li>
                    </ul>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default Panlesaf