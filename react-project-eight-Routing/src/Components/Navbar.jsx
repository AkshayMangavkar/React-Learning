import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/"  className = {({isActive})=> isActive? "active-Link":""} >Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" className = {({isActive})=> isActive? "active-Link":""}>About</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard"  className = {({isActive})=> isActive? "active-Link":""}>Dashboard</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
