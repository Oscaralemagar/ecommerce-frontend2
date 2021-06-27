import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux'
const Register=({history})=>{
    const [email, setEmail]=useState("");


    const {user}=useSelector((state)=>({...state}));
    useEffect(()=>{
        if(user && user.token) history.push('/');
 
    }, [user, history]);

    const handleSubmit=async(e)=>{

        e.preventDefault()
        //console.log("env-->",process.env.REACT_APP_REGISTER_REDIRECT_URL )
        const config={
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp:true,
        }
        await auth.sendSignInLinkToEmail(email,config)
        toast.success(`Email is sent to ${email}. click the link to comlete your registration`);
        //save user email in local storage
        window.localStorage.setItem('emailForRegistration', email)
    }
    const registerFrom=()=>
    <form onSubmit={handleSubmit}>
<input type="email" className="form-control" value={email} 
onChange={(e)=>setEmail(e.target.value)} placeholder="your Email"
autoFocus/>
<br />
<button type="submit" className="btn btn-raised ">Register</button>

    </form>
    return(
        <div className="container p-5">
            <div className="row">
        <div className="div-col-5"></div>
       <div className="col-md-6 offset-md-3">
          <h4>Register</h4> 
         {registerFrom()}
       </div>

            </div>
            
        </div>
    )
}

export default Register