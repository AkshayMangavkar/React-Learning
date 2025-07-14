import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   alert("i will run on every render");
  // })
  
//runs on only first render
  //  useEffect(() => {
  //   alert("i will run on 1st render only");
  // },[])

    //  useEffect(() => {
    //     alert("i will run when count is updated");
    //     },[count]) 

        useEffect(() => {
          alert("i will run when count is updated");
        
          return () => {
            alert("clean up........");
          }
        }, [count])
        

  function handleclick(){
    setCount(count+1);
  }

  return (
    <>
      <div>
        <button onClick={handleclick}>count</button>
        <br />
        count is: {count};
      </div>
    </>
  )
}

export default App
