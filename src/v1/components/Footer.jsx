import React from 'react';
import './css/Footer.css';
import useScramble from '../hooks/useScramble';

const Footer = () => {
    const [scrambledHeading, headingRef] = useScramble("I Made This Sh*t", 500);

    return (
        <footer id="contact">
            <div className='info'>
                <div className="left">
                    <h2 ref={headingRef}>{scrambledHeading}</h2>
                </div>
                <div className="right">
                    <a href="https://www.linkedin.com/in/jpyang" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://github.com/haochibao" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="mailto:jamesyang663@gmail.com">Email</a>
                    <a href="https://devpost.com/jamesyang663" target="_blank" rel="noopener noreferrer">Devpost</a>
                    <a href="https://x.com/jamesyanger" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>
            <div className='dots'>
                {/* <img src={dots} alt="Decorative dots" /> */}
            </div>
        </footer>
    );
};

export default Footer;
