import React from 'react';
import './Home.css'; // Ensure this path is correct
import background4 from '../Assets/background4.jpg'; // Adjust the path to your image
import background2 from '../Assets/background2.jpg'; // Add relevant images for features
import doctor from '../Assets/doctor.jpg';
import home1 from '../Assets/home1.jpeg'; // Correct image reference

const Home = () => {
  return (
    <div className="home-container">
      <img src={background4} alt="Homepage" className="home-image" />
      <div className="home-text">
        <h1>Welcome to Disease Detect</h1>
        <p>Your go-to tool for identifying diseases and recommending medication based on symptoms.</p>
      </div>

      {/* Add a new section for Features */}
      <div className="features-section">
        <h2>Why Use Disease Detect?</h2>
        <div className="features">
          <div className="feature">
            <img src={background2} alt="Feature 1" className="feature-image" />
            <h3>Symptom Analysis</h3>
            <p>Our advanced algorithms analyze your symptoms and provide precise results to identify potential diseases.</p>
          </div>
          <div className="feature">
            <img src={doctor} alt="Feature 2" className="feature-image" />
            <h3>Personalized Medication Recommendations</h3>
            <p>Receive tailored medication suggestions based on the identified conditions, helping you recover faster.</p>
          </div>
          <div className="feature">
            <img src={home1} alt="Feature 3" className="feature-image" /> {/* Updated from 'home' to 'home1' */}
            <h3>Extensive Database of Diseases</h3>
            <p>Our platform is equipped with an extensive database, covering a wide range of diseases and related symptoms.</p>
          </div>
        </div>
      </div>

      {/* Add a section for How It Works */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Enter your symptoms in the search box.</li>
          <li>Our system compares your symptoms with its database of diseases.</li>
          <li>You receive a list of potential diseases and recommended medications.</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
