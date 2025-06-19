import './css/Landing.css';

import { useEffect } from "react";

import pfp1 from '../assets/images/pfp (1).png';
import pfp2 from '../assets/images/pfp (2).png';
import pfp3 from '../assets/images/pfp (3).png';

import verified from '../assets/images/verified.png';

import cloud1 from '../assets/images/cloud (1).png';
import cloud2 from '../assets/images/cloud (2).png';

const metrics = [
    {
        title: 'Hackathon Wins',
        value: '20',
    },
    {
        title: 'Projects Coded',
        value: '50+',
    },
    {
        title: 'Dogs',
        value: '2',
    }
]

const Landing = () => {
    useEffect(() => {
    }, []);

    return (
        <div className="landing">
            <div className="profile-card">
                <div className="banner">
                    <img id={'cloud-1'} src={cloud1} alt="" />
                    <img id={'cloud-2'} src={cloud2} alt="" />
                    <div className="social-links"></div>
                </div>
                <div className="content">
                    <div className="pfp">
                        <img src={pfp3} alt="Profile" className="pfp-image" />
                    </div>
                    <h1 className="name">James Yang</h1>
                    <div className="verified">
                        <img src={verified} alt="Verified" className="verified-icon" />
                        <span className="verified-text">Chronic Builder</span>
                    </div>
                    <p className="bio">I’m a software engineer that builds ideas into reality. Checkout out the things I’ve worked on.</p>
                    <div className="metrics">
                        {metrics.map((metric, index) => (
                            <div className="metric" key={index}>
                                <h2 className="metric-value">{metric.value}</h2>
                                <p className="metric-title">{metric.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;