import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  return (
    <div>

      <form onSubmit={handlesubmit} >
        <input type="text" onChange={handleinputchange} />
        <button type='submit'>submit</button>
      </form>
{/* 
    <p onMouseOver={handlemouseover} style={{border : "1px solid black"}}>
      i am the para the king
    </p>

    <button onClick={handleclick}>
      click me
    </button> */}

    </div>
    
  )

  function handleclick(){
    alert("click ho gaya bhai");
  }

  function handlemouseover(){
    alert("para ke uper aa gaye hoo");
  }

  function handleinputchange(e){
    console.log("value till now:",e.target.value);
  }

  function handlesubmit(e){
    e.preventDefault();

    alert("submit kardu kya bhai?");
  }

}

export default App
