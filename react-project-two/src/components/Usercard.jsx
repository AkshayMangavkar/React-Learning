import React from 'react'

import './Usercard.css'



const Usercard = (props) => {
  return (
    <div className='user-container' style={props.style} >

        <p id='user-name'>{props.name} </p>
        <img id='user-image' src={props.image} alt="User-image" />
        <p id='user-desc'>{props.desc}</p>
      
    </div>
  )
}

export default Usercard
