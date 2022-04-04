import React from 'react';
import { Button } from '../Button';
import '../../App.css';
import '../../assets/About.css';

function Company() {
  return (
    <div className='hero-container'>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
  
      </div>
    </div>
  );
}

export default Company;