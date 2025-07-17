import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {

    const navigate = useNavigate();

  function handlClick(){
      navigate("/About");
  }


  return (
    <div>
      Home page 
      <br />
      <button onClick={handlClick}>
        Move to About
      </button>
    </div>
  )
}

export default Home
