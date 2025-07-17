import React from 'react'
import { Outlet, useNavigate } from 'react-router'

const Dashboard = () => {

  const navigate=useNavigate();

  function handleClick(){
      navigate("/Dashboard/Courses");
    }

    function handleClick2(){
      navigate("/Dashboard/Moke-Tests");
    }


  return (
    <div>
      Dashboard page
      <br />
      <button onClick={handleClick}>
        Move to courses
      </button>
      <br />

    <br />
      <button onClick={handleClick2}>
        Move to moketest
      </button>

      <Outlet/>
    </div>
  )
}

export default Dashboard
