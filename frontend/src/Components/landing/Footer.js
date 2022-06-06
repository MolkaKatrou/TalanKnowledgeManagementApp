import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import '../../assets/About.css';



function Footer() {
  return (
    <div className='footer-container'>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
            <img style={{width:"98px"}} src={logo} alt='logo' />
            </Link>
          </div>
          <small className='website-rights'>Talan Consulting Tunisia © 2022</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to={{ pathname: "https://www.facebook.com/TalanTunisia" }} 
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to={{ pathname: "https://www.instagram.com/talan.group/" }}
              
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
           
            <Link
              className='social-icon-link twitter'
              to={{ pathname: "https://twitter.com/talan_fr" }} 
            
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to={{ pathname: "https://www.linkedin.com/company/talan-tunisie/" }} 
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;