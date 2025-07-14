import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login';
import Logout from './Components/Logout';

function App() {
  const [isLogedin, setLogedin] =useState(true);


 // early return 
if(!isLogedin){
  return (
    <Login />

  )
}

// using logical operator
return (
  <div>
    <h1>
      Welcome to the new WORLD EVERYONE !!!
    </h1>
    <div>
      {isLogedin && <Logout />}
    </div>
  </div>
)



// using Ternary operator
// return (
//   <div>

//   {isLogedin ? <Logout /> : <Login /> }

//   </div>
// )


// using if else
  // if(isLogedin){
  //   return(
  //     <Logout />
  //   )
  // }else{
  //   return(
  //     <Login />
  //   )
  // }

}

export default App
