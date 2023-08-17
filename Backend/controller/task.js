import {db} from '../db.js'

export const getPost = async (req,res) =>{
   try{
      const id = req.params.id; // Assuming the parameter is named userId
      const q = "SELECT * FROM tasks WHERE user_id = ?"

   db.query(q,[id] , (err,data)=>{
    if(err) return res.status(500).json("Internal Error")
    return res.status(200).json(data)
   })

   }
   catch(err){
    res.json(err)
   } 
}

export const addPost = async (req,res) =>{
    try{
  const id = req.params.id;
  const taskData = req.body;

  // Insert the received task data into the tasks table
  const insertQuery = 'INSERT INTO tasks (title, description, due_date, status, user_id) VALUES (?, ?, ?, ?, ?)';
  const values = [taskData.title, taskData.description, taskData.due_date, taskData.status, id];

  db.query(insertQuery, values, (err, result) => {
    if (err) return res.status(500).json( 'Error adding task');
    return res.status(200).json( 'Task added successfully' );
  });

    }
    catch(err){
     res.json(err)
    } 
 }

 export const updatePost = async (req,res) =>{
   
   try{
  const id = req.params.id
  const q = "UPDATE tasks SET status = ? WHERE id = ?"
  const newStatus = req.body.status

  const values = [newStatus , id]
  


  db.query(q,values, (err,data)=>{
    if (err) return res.status(500).json( 'Error Updating task');
    return res.status(200).json(data);
  
  })


    }
    catch(err){
     res.json(err)
    } 
 }

 export const deletePost = async (req,res) =>{
    try{
    const id = req.params.id
    const q = 'DELETE From tasks WHERE id = ?'
    
    db.query(q,[id], (err,data)=>{
      if(err) return res.status(500).json("Error Deleting the task")
    return res.status(200).json(data)
    })


    }
    catch(err){
     res.json(err)
    } 
 }