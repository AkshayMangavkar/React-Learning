import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChildA from './Components/ChildA'




const UserContext = createContext();




function App() {
  
const [user,setuser] =useState({name:"Akshay"});
  return (
  
    <>
      <UserContext.Provider value= {user}>

      <ChildA />

      </UserContext.Provider>
        
    </>
    
  )
}

export default App
export {UserContext}
