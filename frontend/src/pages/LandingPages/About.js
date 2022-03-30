import React from 'react';
import '../../App.css';
import Cards from '../../Components/Cards'
import Company from '../../Components/Company';
import Footer from '../../Components/Footer';
import Navbar from '../../Common/Navbar';

function About() {
  return (
    <>
      <Navbar/>
      <Company />
      <Cards/>
      <Footer/>
    </>
  );
}

export default About;