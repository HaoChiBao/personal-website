import sky from '../assets/sky (3).mp4'
import './css/Landing.css';

import { useEffect } from "react";
import Glass from './Glass';


const Landing = () => {
    useEffect(() => {
    }, []);

    return (
        <div className="landing">
            <video autoPlay loop muted className="background-video">
                <source src={sky} type="video/mp4" />
            </video>

            <div className="landing-content">
                <h1>
                    <span>Hi, I'm</span>&nbsp;
                    <Glass className='text-spotlight'><span>James</span></Glass>&nbsp;
                    <span>— a passionate</span>&nbsp;
                    <Glass className = 'text-spotlight'>Software Engineer</Glass>&nbsp;
                    <span>and</span>&nbsp;
                    <Glass className = 'text-spotlight'>Relentless Builder</Glass>.
                </h1>
            </div>
        </div>
    );
}

export default Landing;