import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoImg  from "../static/assets/images/logo-vcproy.png";

const Navbar = ({ isLoggedIn }) => {
  return (
  <div className='header-wrapper'>
     <div 
          className="left-side"
          style={{
            backgroundImage: `url(${LogoImg})`,
            backgroundRepeat: 'no-repeat',
            width:'200px',height: '63px'
          }}
         />  
        <div className="right-side">
          <div className="navbar">
            <NavLink to="/proyectos" activeclassname= "nav-link-active">Proyectos</NavLink>
            <NavLink to="/usuarios" activeclassname= "nav-link-active">Usuarios</NavLink>

              {isLoggedIn ? (
                <NavLink to="/logout">Logout</NavLink>
                ) : (
                <NavLink to="/login">Login</NavLink>
              )}
          </div>
        </div>
  </div>
  );
};

export default Navbar;
