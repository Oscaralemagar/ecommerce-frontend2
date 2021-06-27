import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux'
import {createOrUpdateUser} from '../../functions/auth'



const RegisterComplete=({history})=>{
    const [email, setEmail]=useState("");
    const [password, setPassword]= useState('')

    
    // const {user}=useSelector((state)=>({...state}));
    let dispatch= useDispatch()
    useEffect(()=>{
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [history])
   

    const handleSubmit=async(e)=>{

        e.preventDefault()

        //validation
     
        if(!email || !password){
            toast.error('Email and password is required')
            return
        }
        if(password.length<6){
            toast.error('password must be at least 6 char')
            return
        }
try{
    const result=await auth.signInWithEmailLink(email,
        window.location.href)
       // console.log('result is', result)
      if(result.user.emailVerified){
           // remove user email from local storage
           window.localStorage.removeItem('emailForRegistration');
           // get usr id token
           let user =auth.currentUser
           await user.updatePassword(password);
           const idTokenResult= await user.getIdTokenResult()
           //redux store
        console.log('user', user, 'idTokenResult', idTokenResult)


        createOrUpdateUser(idTokenResult.token)
.then(res=> {
    dispatch({
        type: "LOGGED_IN_USER",
        payload: {
            name :res.data.name,
            email: res.data.email,
            token:idTokenResult.token,
            role: res.data.role,
            _id: res.data._id,

        },
    });
})
.catch();
           //redirect
           history.push('/')

        }
}

catch(error){
console.log(error)
toast.error(error.message)
}
    }
   
    const completeRegistrationForm=()=>
    <form onSubmit={handleSubmit}>
<input type="email" className="form-control" value={email}  disabled />
<input type="password" className="form-control" value={password}  
onChange={e=>setPassword(e.target.value)} autoFocus placeholder="password"/>
<button type="submit" className="btn btn-raised ">Compelete Register</button>

    </form>
    return(
        <div className="container p-5">
            <div className="row">
        <div className="div-col-5"></div>
       <div className="col-md-6 offset-md-3">
          <h4> Complete Registeration</h4> 
         {completeRegistrationForm()}
       </div>

            </div>
            
        </div>
    )
}

export default RegisterComplete