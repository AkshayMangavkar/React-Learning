import React from 'react'
import { useNavigate } from 'react-router'

const About = () => {
    const navigate = useNavigate();

    function handleClick(){
      navigate("/Dashboard");
    }

  return (
    <div>
      About page
      <br />
      <button onClick={handleClick}>
        Move to Dash
      </button>
    </div>
  )
}

export default About
