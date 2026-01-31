
import React from 'react';
import '../styles/v2.css';
import Highlights from '../components/Highlights';
// Importing images from v1 assets if possible, for now using placeholders or just text to match design "clouds"
import cloud1 from '../../assets/images/cloud (1).png';
import cloud2 from '../../assets/images/cloud (2).png';

const Home_V2 = () => {
  return (
    <div className="v2-container">
      <div className="headers">
        <div className="header-left" style={{ fontWeight: 700 }}>James Yang</div>
        <div className="header-right">
          <a className="header-link">About</a>
          <a className="header-link">Hackathons</a>
          <a className="header-link">Fun</a>
        </div>
      </div>

      <div className="intro-section">
        <div className="cloud-images">
             <img id="cloud-1" src={cloud1} className="cloud-img" alt="cloud 1" />
             <img id="cloud-2" src={cloud2} className="cloud-img" alt="cloud 2" />
        </div>

        <div className="intro-text">
          <h2>I'm James Yang.</h2>
          <p>
            I'm a software engineer and chronic builder, I poke at problems, fix what breaks, and make hard things understandable. I run on optimism, snacks, and sticky notes.
          </p>
        </div>
      </div>

      <Highlights />
    </div>
  );
};

export default Home_V2;
