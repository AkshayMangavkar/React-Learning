import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from './features/counter/CounteSlice'



function App() {
  
  const count=useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  function handleincrement(){
      dispatch(increment());

  }

  function handledecrement(){
    dispatch(decrement());

  }

  function handlreset(){
    dispatch(reset());

  }

  function handleIncAmout(){
    dispatch(incrementByAmount(amount));
  }

  return (
    <>
    
      <div className='container'>

        <button onClick={handleincrement}> + </button>
        <p>count: {count} </p>
        <button onClick={handledecrement}> - </button>
        <br />
        <button onClick={handlreset}> Reset </button>
        <br />
        <br />

        <input 
          type="number" value={amount} placeholder='Enter Amount' onChange={(e)=>setAmount(e.target.value)} />

          <br />
          <br />

          <button onClick={handleIncAmout}> Incremet Amount INC </button>


      </div>
      
    </>
  )
}

export default App
