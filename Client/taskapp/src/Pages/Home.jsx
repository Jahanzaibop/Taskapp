import React, { useContext } from 'react'
import { useState , useEffect } from 'react'
import { UserContex } from '../Contex/userContex'
import axios from 'axios'
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';


const Home = () => {
const {currentUser} = useContext(UserContex)
const [tasks, setTasks] = useState([])

useEffect(()=>{
 
  if(currentUser){
   fetchTasks(currentUser.id)   
  }

}, [currentUser])

const fetchTasks = async (id)=>{
  try{
   const res = await axios.get(`http://localhost:8800/api/tasks/${id}`)
   setTasks(res.data)
  }
  catch(err){
    console.error(err)
  }
}

const handleDelete = async (id) =>{
  console.log(id)
  try{
  await axios.delete(`http://localhost:8800/api/tasks/${id}`)
  setTasks(tasks.filter(task => task.id !== id));
  }
  catch(err){
    console.error(err)
  }

}

const calculateTimeLeft = (dueDate) => {
  const now = new Date();
  const dueDateTime = new Date(dueDate);

  if (now > dueDateTime) {
    return "Due Date Crossed";
  }

  const differenceMinutes = differenceInMinutes(dueDateTime, now);

  if (differenceMinutes < 60) {
    return `${differenceMinutes} minutes left`;
  } else if (differenceMinutes < 1440) {
    const differenceHours = differenceInHours(dueDateTime, now);
    return `${differenceHours} hours left`;
  } else {
    const differenceDays = differenceInDays(dueDateTime, now);
    return `${differenceDays} days left`;
  }
};

const handleStatusUpdate = async (id, newStatus) => {
  try {
    await axios.put(`http://localhost:8800/api/tasks/${id}`, { status: newStatus });
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className='container'>
      <div className='add-somemargin'>
      <h1>Welcome, {currentUser.username}!</h1>
      
      <div className='row'>
      {tasks.length === 0 ? (
       <p className='para'>No Tasks Avaialble</p> 
      ):(
        tasks.map(task =>(
          <div className='column' key={task.id}>
          <div className={`task-wrapper ${task.status}`}>
          <h2>{task.title}</h2>
          <p>{calculateTimeLeft(task.due_date)}</p>
          <p>{task.description}</p>
          
          <span className='status'>{task.status}</span>
          <ul>
          <li><button onClick={() => handleStatusUpdate(task.id, 'Pending')}>Pending</button></li>   
          <li><button onClick={() => handleStatusUpdate(task.id, 'In progress')}>In Progress</button></li> 
          <li><button onClick={() => handleStatusUpdate(task.id, 'Completed')}>Complete</button></li> 
          <li><button onClick={()=> handleDelete(task.id)}>Delete</button></li>
          </ul>
          </div>
          </div>
          
        ))

      )

      }
     </div> 
   </div>
    </div>
  )
}

export default Home
