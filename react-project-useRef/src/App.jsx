import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  let val =useRef(0);   // persist the value across re render

  let btnref = useRef();

  function handleClick(){

    setCount(count+1);
    val.current = val.current + 1;
  }

  function changeColor(){

      btnref.current.style.backgroundColor="red";
  }


  useEffect(() => {
  
      console.log("RE-RENDER HO GAYA..")
      console.log("val is:", val)
  },)
  


  return (
    <>
      <div>
      <button ref={btnref} onClick={handleClick}> increment</button>
    </div>

    <div>
      <button  onClick={changeColor}>
        Change color
      </button>
    </div>

      <div>
        coutn:{count};
      </div>

    </>
  )
}

export default App
