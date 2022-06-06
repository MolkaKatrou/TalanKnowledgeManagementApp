import React from "react";
import { Button } from '../../Components/Button';
import image1 from '../../images/home1.png';
import '../../App.css';
import "../../assets/home.css";
import Navbar from "../../Common/Navbar";



export default function Landing () {
  return (
    <>
    <Navbar/>
    <section className="home-container">
      <div className="home-wrapper">
      <img src={image1}/>
      <div className="Left-wrapper">
      <h1> It's Time To Share Your Knowledge</h1>
      <h2>Harness the power of knowledge sharing at Talan Consulting
       where all information is easy to find for everyone no matter their department, role or location making this platform a way to further cultivate our team and increase productivity as well as employee engagement </h2>
      <div className="get-started">
        <Button
          className='btns'
          buttonStyle='.btn--primary'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        </div>
        </div>
  
       </div>
    </section>
    </>
  );
};

