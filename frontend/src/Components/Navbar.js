import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import logo from '../images/logo.png'
import '../assets/Navbar.css';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <NavLink
            to='/'
            className='navbar-logo'
            onClick={handleClick}>
            <img style={{ marginRight: '200px', width: "98px" }} src={logo} alt='logo' />
          </NavLink>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <NavLink
                to="/"
                className='nav-links'
                onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to="/about"
                className='nav-links'
                onClick={handleClick}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className='nav-links-mobile'
                onClick={handleClick}
              >
                Sign In
              </NavLink>
            </li>
          </ul>

          {button && <Button buttonStyle='btn--outline'>SIGN IN</Button>}
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;