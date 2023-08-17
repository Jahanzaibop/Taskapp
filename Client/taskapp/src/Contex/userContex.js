import { createContext , useEffect, useState } from "react";
import axios from "axios";

export const UserContex = createContext()

export const UserContexProvider = ({children}) =>{
   const [currentUser , setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
   
   const login = async(input)=>{
    const res =  await axios.post("http://localhost:8800/api/auth/login" , input)
    setCurrentUser(res.data)
   }

   const logout = async(input)=>{
    await axios.post("http://localhost:8800/api/auth/logout")
    setCurrentUser(null)
   }

   useEffect(()=>{
     localStorage.setItem("user", JSON.stringify(currentUser))
   }, [currentUser])

   return (
    <UserContex.Provider value={{currentUser , login , logout}}>{children}</UserContex.Provider>
   )

} 