import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import '../assets/About.css';



function Footer() {
  return (
    <div className='footer-container'>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
            <img style={{width:"98px"}} src={logo} alt='logo' />
            </Link>
          </div>
          <small class='website-rights'>Talan Consulting Tunisia © 2022</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to={{ pathname: "https://www.facebook.com/TalanTunisia" }} 
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to={{ pathname: "https://www.instagram.com/talan.group/" }}
              
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
           
            <Link
              class='social-icon-link twitter'
              to={{ pathname: "https://twitter.com/talan_fr" }} 
            
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to={{ pathname: "https://www.linkedin.com/company/talan-tunisie/" }} 
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;