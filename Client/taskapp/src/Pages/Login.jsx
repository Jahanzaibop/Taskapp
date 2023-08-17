import React, { useContext } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContex } from '../Contex/userContex'

const Login = () => {
  const [input , setinput] = useState({
   username:'',
   password: ''
  })
  

  const navigate = useNavigate();
  const {login} = useContext(UserContex)

  const [err , setErr] = useState("")
  const handleChange = (e)=>{
   setinput((prev)=> ({...prev , [e.target.name]: e.target.value})) 
  }

  const handleClick = async e =>{
    e.preventDefault()

    if(!input.username || !input.password ) return alert("all Fields are required")
    
    try{
      await login(input)
      setErr(null)
      navigate('/')

  }
    catch(err){
      setErr(err.response.data)
    }
  }

  return (
    <div className='add_taskwrapper'>
    <section className='register-sec'>
    <div className='container'>
    <h1>Login</h1>
    <input type="text" placeholder='Username' name="username" onChange={handleChange}/>
    <input type="password" placeholder='password' name="password" onChange={handleChange}/>
    <button onClick={handleClick}>Login</button>

   {err && <p className='err-message'>{err}</p>}

   
    
    </div>
    </section>
    </div>
  )
}

export default Login
