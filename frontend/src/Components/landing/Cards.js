import React from 'react';
import '../../assets/About.css';
import CardItem from './CardItem';
import msg from '../../images/msg.png';
import post from '../../images/post.jpg';
import qanda from '../../images/qanda.jpg';




function Cards() {
  return (
    <div className='cards'>
      <h1 className='h1'>What do we offer?</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={msg}
              text='An online Chat and social interaction to give employees a faster and more convenient way to get in touch with each team and boost agent productivity, help you get to know the team better and share ideas and feedback'
              

            />
            <CardItem
              src={post}
              text='Build categorized knowledge among the company to apply each other best practices and reduce loss of knwoledge and know how of each department to assure that knowledges are easily found'
             

            />
            <CardItem
              src={qanda}
              text='Help developers find answers on a wide range of programming topics and get feedback from other collaborators at Talan by building out categorized questions that contain all the information that someone would need to get up-to-speed'
           

            />
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Cards;
