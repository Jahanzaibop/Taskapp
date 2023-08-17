import './App.css';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Header from './Components/Header'
import Addtask from './Pages/Addtask';
import { UserContex } from './Contex/userContex';
import { useContext } from 'react';


function App() {
 
const {currentUser} = useContext(UserContex)

  return (
    <>
    <Router>
      <div>
        <Header/>
        <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Navigate to="/register" />} />  
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/addtask' element={currentUser? <Addtask/> : <Navigate to="/register" />}/>
        </Routes>
        
      </div>
    </Router>
    </>  
    );
}

export default App;
