import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContex } from '../Contex/userContex'


const Addtask = () => {
 const [addTask,setAddTask] = useState({
    title:'',
    description:'',
    due_date:'',
    status:''
 }) 

const navigate = useNavigate()
const {currentUser} = useContext(UserContex)

 const handleChange = (e)=>{
  setAddTask((prev) => ({...prev , [e.target.name]: e.target.value}))
}

const handleSubmit = async e =>{
  e.preventDefault()
  try{
  const taskToAdd = {
    ...addTask,
    id: currentUser.id
  }
  
  await axios.post(`http://localhost:8800/api/tasks/${currentUser.id}` , taskToAdd)
  navigate("/")
  }
  catch(err){
    console.error(err)
  }
}






  return (
    <div className='container'>
      <div className='add_taskwrapper'>
    <div className='register-sec'>
  <h1>Add Task</h1>    
  <input type='text' placeholder='Title' name="title" onChange={handleChange}/>
  <textarea type='text' placeholder='Description' name="description" onChange={handleChange}/>
  <input type='date' placeholder='Title' name="due_date" onChange={handleChange}/>
  <select name="status" onChange={handleChange}>
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        
      </select>
 
  <button onClick={handleSubmit}>Add</button>
    </div>
    </div>
    </div>
  )
}


export default Addtask
