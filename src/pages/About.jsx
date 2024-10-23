import React from 'react';
import './About.css';
import doctor1 from '../Assets/doctor1.jpg'; // Ensure this path is correct

const About = () => {
  return (
    <div className="about-container">
      <img src={doctor1} alt="Disease Detect" className="about-image" />
      <div className="about-text">
        <div>
          <h1>About Disease Detect</h1>
          <p>
            Disease Detect is an online web application designed to help users identify potential diseases based on their symptoms. 
            Simply enter your symptoms, and our system will analyze them to suggest possible diseases and recommend necessary medication.
            This tool aims to provide quick and accurate insights to help users take appropriate action regarding their health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;