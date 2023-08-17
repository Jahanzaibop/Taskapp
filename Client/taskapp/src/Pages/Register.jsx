import React from 'react'
import { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios'


const Register = () => {
  const [input , setinput] = useState({
   username:'',
   email:'',
   password: '',
  })
  
  const navigate = useNavigate();

  const [err , setErr] = useState("")
  const handleChange = (e)=>{
   setinput((prev)=> ({...prev , [e.target.name]: e.target.value})) 
  }

  const handleClick = async e =>{
    e.preventDefault()

    if(!input.username || !input.password ) return alert("all Fields are required")

    try{
      await axios.post("http://localhost:8800/api/auth/register" , input)
      setErr(null)
      navigate("/login")
  }
    catch(err){
      setErr(err.response.data)
    }
  }

  return (
    <div className='add_taskwrapper'>
    <section className='register-sec'>
    <div className='container'>
    <h1>Register</h1>
    <input type="text" placeholder='Username' name="username" onChange={handleChange}/>
    <input type="email" placeholder='Email' name="email" onChange={handleChange}/>
    <input type="password" placeholder='password' name="password" onChange={handleChange}/>
    <button onClick={handleClick}>Register</button>

   {err && <p className='err-message'>{err}</p>}

    <p>If you have already an account <Link to="/login">Login</Link> </p>
    
    </div>
    </section>
    </div>
  )
}

export default Register
