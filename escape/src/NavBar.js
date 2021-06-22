import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./photos/ESCAPE.png";
import Search from "./Search";
import './navBar.css'

const Navbar = () => {
  return (
    <div>
      {/* <nav>
      <img src={logo}  alt="logo"/>
        <div className="navList">
           
            <NavLink exact to='/search' className='navItem'><Search /></NavLink>
            <NavLink exact to='/' className='navItem'>Home</NavLink>
            <NavLink exact to='/account' className='navItem'>Account</NavLink>
            <NavLink exact to='/store' className='navItem'>Store</NavLink>
            <NavLink exact to='/about' className='navItem'>About</NavLink>
            <NavLink exact to='/signin' className='navItem'>Sign In</NavLink>
            NavLink exact to='/signup' className='navItem'>Sign Up</NavLink>
            
        </div>
      </nav> */}
    </div>
  );
};

export default Navbar;