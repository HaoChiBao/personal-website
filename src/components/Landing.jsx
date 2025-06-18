import './css/Landing.css';

import { useEffect } from "react";
import Glass from './Glass';

const Landing = () => {
    useEffect(() => {
    }, []);

    return (
        <div className="landing">
            <div className="landing-content">
                <h1>
                    <span>Hi, I'm</span>&nbsp;
                    <Glass className='text-spotlight'><span>James</span></Glass>&nbsp;
                    <span>- a passionate</span>&nbsp;
                    <Glass className = 'text-spotlight'><span>Software Engineer</span></Glass>&nbsp;
                    <span>and</span>&nbsp;
                    <Glass className = 'text-spotlight'><span>Chronic Builder</span></Glass>
                </h1>
            </div>
        </div>
    );
}

export default Landing;