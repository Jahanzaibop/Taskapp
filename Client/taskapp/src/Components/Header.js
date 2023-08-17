import React, { useContext , useState , useEffect } from 'react'
import { UserContex } from '../Contex/userContex'
import { Link } from 'react-router-dom'


const Header = () => {

const {currentUser , logout} = useContext(UserContex)
const [isDarkMode , setIsDarkMode] = useState(false)
const [buttonText , setButtonText] = useState('Dark Mode')


const toggleMode = () => {
  setIsDarkMode((prevMode) => {
    const newMode = prevMode === "light" ? "dark" : "light";
    setButtonText(newMode === 'dark' ? 'Light Mode' : 'Dark Mode'); 
    localStorage.setItem(`darkMode_${currentUser.id}`, newMode);
    applyDarkMode(newMode);
    return newMode;
  });
};

const applyDarkMode = (mode)=>{
  if(mode === 'dark'){
   document.body.classList.add('darkmode') 
  }
  else{
    document.body.classList.remove('darkmode')  
  }
}

useEffect(() => {
  if (currentUser) {
    const savedMode = localStorage.getItem(`darkMode_${currentUser.id}`);
    const savedButtonText = savedMode === 'dark' ? 'Light Mode' : 'Dark Mode';
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
      setButtonText(savedButtonText);
      applyDarkMode(savedMode);
    } else {
      // Initialize state and button text
      setIsDarkMode(false);
      setButtonText('Dark Mode');
    }
  }
}, [currentUser]);


const clearDarkMode = () => {
  localStorage.removeItem(`darkMode_${currentUser.id}`);
  setIsDarkMode(false);
  setButtonText('Dark Mode');
  applyDarkMode('light'); 
};

const handleLogout = () => {
  clearDarkMode(); 
  logout();
};

  return (
    <header>
      <div className='container'>  
      <h1><Link to="/">Task App</Link></h1>
      <div className='navbar'>
       <span >{currentUser?.username}</span>
       {currentUser? <><span onClick={handleLogout} className='logout-btn'>Logout</span> <Link to={"/Addtask"}> Add Task</Link> <button className='togglemodebtn' onClick={toggleMode}>{buttonText}</button>  </> : <Link to="/login">Login</Link>} 
      
      
      
      </div>
    
    
    
    </div>
    </header>
    
  )
}

export default Header
