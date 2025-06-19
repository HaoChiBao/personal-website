import React from 'react';
import './css/Footer.css';

import dots from '../assets/images/dots.png';

const Footer = () => {
    return (
        <footer id = "contact">
            <div className='info'>
                <div className="left"><h2>I Made This Sh*t</h2></div>
                <div className="right">
                    {/* links for linkedin, github, email, devpost, twitter */}
                    <a href="https://www.linkedin.com/in/jpyang" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        LinkedIn
                    </a>
                    <a href="https://github.com/haochibao" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        GitHub
                    </a>
                    <a href="mailto:jamesyang663@gmail.com" aria-label="Email">
                        Email
                    </a>
                    <a href="https://devpost.com/jamesyang663" target="_blank" rel="noopener noreferrer" aria-label="Devpost">
                        Devpost
                    </a>
                    <a href="https://x.com/autocommitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        Twitter
                    </a>
                </div>
            </div>
            <div className='dots'>
                {/* <img src={dots} alt="Decorative dots" /> */}
            </div>
        </footer>
    )
}

export default Footer;