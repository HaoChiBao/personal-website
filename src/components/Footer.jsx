import React from 'react';
import './css/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className='info'>
                <div className="left"><h2>I Made This Sh*t</h2></div>
                <div className="right">
                    {/* links for linkedin, github, email, devpost, twitter */}
                    <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        LinkedIn
                    </a>
                    <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        GitHub
                    </a>
                    <a href="mailto:your.email@example.com" aria-label="Email">
                        Email
                    </a>
                    <a href="https://devpost.com/your-devpost" target="_blank" rel="noopener noreferrer" aria-label="Devpost">
                        Devpost
                    </a>
                    <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        Twitter
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;