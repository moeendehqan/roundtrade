import {useState,useRef} from 'react'
import axios from 'axios'
import {setCookie, getCookie} from '../cookie/cookie'


const Login = (props) =>{
    const filphone = useRef(null)
    const filpass = useRef(null)
    const filcodeinp = useRef(null)




    const mode = props.mode
    const [lr, setLr] = useState('login')
    const handleLr = (e,tf)=>{setLr(tf)}

    const [phone, setphone] = useState('')
    const changephone = (e)=>{setphone(e.target.value)}
    const [password, setpassword] = useState('')
    const changepassword = (e)=>{setpassword(e.target.value)}
    const [repassword, setrepassword] = useState('')
    const changerepassword = (e)=>{setrepassword(e.target.value)}
    const [msg, setmsg] = useState('')
    const [code,setcode] = useState(false)
    const [codeinp,setcodeinp] = useState('')
    const changecodeinp = (e)=>{setcodeinp(e.target.value)}


    const handleRegister = (e) =>{
        if(lr==='register'){
            e.preventDefault()
            if(phone[0]!=='0' || phone[1]!=='9' || phone.length!==11){
                setmsg('شماره همراه را صحیح وارد کنید')
                filphone.current.focus();
            }else{
                if(password.length<4){
                    setmsg('رمزعبور کوتاه است')
                    filpass.current.focus();
                }else{
                    if(password!==repassword){
                        setmsg('رمزعبور و تکرا آن یکسان نیست')
                        filpass.current.focus();
                    }else{
    
                        axios({
                            method: 'post',
                            url: "http://localhost:5000/api/validation",
                            data: {phone:phone}
                        }).then((response)=>{
                            if (response.data.register === true){
                                setLr('code')
                                setmsg(response.data.msg)
                                setcode(response.data.validtionCodeSend)
                                
                            }else{
                                setmsg(response.data.msg)
                            };
                        }).catch((response)=>{
                            console.log(response);
                        })}}}}

        if(lr==='code'){
            if(codeinp!==code.toString() && codeinp.length>0){
                setmsg('کد تایید صحیح نیست')
                filcodeinp.current.focus();
            }else{
                axios({
                    method: 'post',
                    url: "http://localhost:5000/api/register",
                    data: {phone:phone, password:password}
                }).then((response)=>{
                    if (response.data.register === true){
                        setmsg(response.data.msg)
                        props.hmod(e,'desk')
                        setCookie('phone',phone,10)
                    }else{
                        setmsg(response.data.msg)
                    };
                }).catch((response)=>{
                    console.log(response);
                })}}}





    const handleLogin = (e)=>{
        e.preventDefault();
        if(phone.length===0){
            setmsg('شماره همراه را وارد کنید')
            filphone.current.focus();
        }else{
            if(password.length===0){
                setmsg('رمزعبور را وارد کنید')
                filpass.current.focus();
            }else{
                axios({
                    method: 'post',
                    url: "http://localhost:5000/api/login",
                    data: {phone:phone, password:password}
                }).then((response)=>{
                    if (response.data.login === true){
                        setmsg(response.data.msg)
                        setCookie('phone',phone,10)
                        props.hmod(e,'desk')
                    }else{
                        setmsg(response.data.msg)
                    };
                }).catch((response)=>{
                    console.log(response);
                })

            }
        }
    }


    const handleforget = (e)=>{
        e.preventDefault()
        if(lr==='login'){
            setLr('forget')
        }else if(lr==='forget'){
                if(phone[0]!=='0' || phone[1]!=='9' || phone.length!==11){
                    setmsg('شماره همراه را صحیح وارد کنید')
                    filphone.current.focus();
                }else{
                    axios({
                        method: 'post',
                        url: "http://localhost:5000/api/forget",
                        data: {phone:phone}
                    }).then((response)=>{
                        if (response.data.act === true){
                            setmsg(response.data.msg)
                            setLr('forgetcode')
                            setcode(response.data.validtionCodeSend)

                        }else{
                            setmsg(response.data.msg)
                        };
                    }).catch((response)=>{
                        console.log(response);
                    })
                }

            }}

    const setforget =(e)=>{
        e.preventDefault()
        if(code.toString()!==codeinp.toString()){
            setmsg('کد تایید صحیح نیست')
        }else if(password!==repassword){
            setmsg('رمز عبور و تکرا آن یکسان نیست')
        }else if(password.length<4){
            setmsg('رمزعبور کوتاه است')
        }else{
            axios({
                method: 'post',
                url: "http://localhost:5000/api/setnewpass",
                data: {phone:phone, password:password}
            }).then((response)=>{
                if (response.data.act === true){
                    setmsg(response.data.msg)
                    setCookie('phone',phone,10)
                    props.hmod(e,'desk')
                }else{
                    setmsg(response.data.msg)
                };
            }).catch((response)=>{
                console.log(response);
            })
        }
    }



    if(mode==='login' && lr==='login'){
        return (
            <div className="login" >
                <h2 onClick={(e)=>props.hmod(e,'home')}>X</h2>
                <button className='blog' onClick={(e)=>handleLr(e,'login')}>ورود</button>
                <button className='blog' onClick={(e)=>handleLr(e,'register')}>ثبت نام</button>
                <br />
                <div className='lform'>
                    <label className='llog'>
                        <span>شماره همراه</span>
                        <input type='tel' onChange={(e)=>changephone(e)} value={phone} ref={filphone}></input>
                    </label>
                    <br />
                    <label className='llog'>
                        <span >رمزعبور</span>
                        <input id='lpass' type='password' onChange={(e)=>changepassword(e)} value={password} ref={filpass}></input>
                    </label >
                    <br />
                    <p className='lerr'>{msg}</p>
                    <br/>
                    <button className='lsub' onClick={(e)=>handleLogin(e)}>تایید</button>
                    <br/>
                    <button className='btmfrg' onClick={(e)=>handleforget(e)}>بازیابی رمزعبور</button>
                </div>
    
            </div>
            )
    }
    if(mode==='login' && lr==='register'){
        return (
            <div className="login" >
                <h2 onClick={(e)=>props.hmod(e,'home')}>X</h2>
                <button className='blog' onClick={(e)=>handleLr(e,'login')}>ورود</button>
                <button className='blog' onClick={(e)=>handleLr(e,'register')}>ثبت نام</button>
                <br />
                <div className='lform'>
                    <label className='llog'>
                        <span>شماره همراه</span>
                        <input type='tel' onChange={(e)=>changephone(e)} value={phone} ref={filphone}></input>
                    </label>
                    <br />
                    <label className='llog'>
                        <span >رمزعبور</span>
                        <input id='lpass' type='password' onChange={(e)=>changepassword(e)} value={password} ref={filpass}></input>
                    </label >
                    <br />
                    <label className='llog'>
                        <span >تکرار رمزعبور</span>
                        <input id='lrpass' type='password' onChange={(e)=>changerepassword(e)} value={repassword}></input>
                    </label >
                    <br />
                    <p className='lerr'>{msg}</p>
                    <br/>
                    <button className='lsub' onClick={(e)=>handleRegister(e)}>تایید</button>
                </div>
    
            </div>
            )
    }

    if(mode==='login' && lr==='code'){
        return (
            <div className="login" >
                <h2 onClick={(e)=>props.hmod(e,'home')}>X</h2>
                <button className='blog' onClick={(e)=>handleLr(e,'login')}>ورود</button>
                <button className='blog' onClick={(e)=>handleLr(e,'register')}>ثبت نام</button>
                <br />
                <div className='lform'>
                    <label className='llog'>
                        <span>کد تایید</span>
                        <input className='lcode' type='tel' onChange={(e)=>changecodeinp(e)} value={codeinp} ref={filcodeinp}></input>
                    </label>
                    <br />
                    <p className='lerr'>{msg}</p>
                    <br/>
                    <button className='lsub' onClick={(e)=>handleRegister(e)}>تایید</button>
                </div>
    
            </div>
            )
    }

    if(mode==='login' && lr==='forget'){
        return (
            <div className="login" >
                <h2 onClick={(e)=>props.hmod(e,'home')}>X</h2>
                <button className='blog' onClick={(e)=>handleLr(e,'login')}>ورود</button>
                <button className='blog' onClick={(e)=>handleLr(e,'register')}>ثبت نام</button>
                <br />
                <div className='lform'>
                    <label className='llog'>
                        <span>شماره همراه</span>
                        <input type='tel' onChange={(e)=>changephone(e)} value={phone} ref={filphone}></input>
                    </label>
                    <br />
                    <p className='lerr'>{msg}</p>
                    <br/>
                    <button className='lsub' onClick={(e)=>handleforget(e)}>تایید</button>
                </div>
    
            </div>
            )
    }

    if(mode==='login' && lr==='forgetcode'){
        return (
            <div className="login" >
                <h2 onClick={(e)=>props.hmod(e,'home')}>X</h2>
                <button className='blog' onClick={(e)=>handleLr(e,'login')}>ورود</button>
                <button className='blog' onClick={(e)=>handleLr(e,'register')}>ثبت نام</button>
                <br />
                <div className='lform'>
                    <label className='llog'>
                        <span>کد تایید</span>
                        <input className='lcode' type='tel' onChange={(e)=>changecodeinp(e)} value={codeinp} ref={filcodeinp}></input>
                    </label>
                    <br />
                    <label className='llog'>
                        <span >رمزعبور</span>
                        <input id='lpass' type='password' onChange={(e)=>changepassword(e)} value={password} ref={filpass}></input>
                    </label >
                    <br />
                    <label className='llog'>
                        <span >تکرار رمزعبور</span>
                        <input id='lrpass' type='password' onChange={(e)=>changerepassword(e)} value={repassword}></input>
                    </label >
                    <br/>
                    <p className='lerr'>{msg}</p>
                    <br/>
                    <button className='lsub' onClick={(e)=>setforget(e)}>تایید</button>

                </div>
    
            </div>
            )
    }
    }


export default Login