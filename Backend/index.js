import express from 'express'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import taskRoutes from './routes/tasks.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())



app.use("/api/auth" , authRoutes)
app.use("/api/tasks" , taskRoutes)
app.use("/api/users" , usersRoutes)







app.listen(8800 , ()=>{
   console.log("This is coming from backend") 
})