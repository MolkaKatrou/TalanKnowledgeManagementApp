import React from 'react';
import '../assets/About.css';
import CardItem from './CardItem';
import cloud from '../images/cloud.png';
import blockchain from '../images/blockchain.png';
import rpa from '../images/rpaa.png';
import webphone from '../images/webweb.png';
import ai from '../images/ai.png';
import BI from '../images/rpa.png';



function Cards() {
  return (
    <div className='cards'>
      <h1 className='h1'>Innovative Technologies</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={cloud}
              text='A vast network of remote servers around the globe hooked together and meant to operate as a single ecosystem'
              label='Cloud Computing'

            />
            <CardItem
              src={rpa}
              text='Build, deploy, and manage software robots that emulate humans actions interacting with digital systems and software'
              label='RPA & Smart Automation'

            />
            <CardItem
              src={BI}
              text='Analyzing data and delivering actionable information that helps making informed business decisions'
              label='Business Intelligence'

            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={blockchain}
              text='A digital ledger of transactions duplicated and distributed across the entire network of computer systems on the blockchain'
              label='Blockchain Technologies'

            />
            <CardItem
              src={webphone}
              text='A set of software products and technologies used to accomplish a particular platform for applications'
              label='Web and mobile development'

            />
            <CardItem
              src={ai}
              text='Machine learning, Deep learning, Reinforcement learning and Computer vision'
              label='Artificial Intelligence'

            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
