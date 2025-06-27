import './css/Landing.css';

import { useEffect, useRef, useState } from "react";

import pfp1 from '../assets/images/pfp/pfp (1).png';
import pfp2 from '../assets/images/pfp/pfp (2).png';
import pfp3 from '../assets/images/pfp/pfp (3).png';
import pfp4 from '../assets/images/pfp/pfp (4).png';
import pfp5 from '../assets/images/pfp/pfp (5).png';
import pfp6 from '../assets/images/pfp/pfp (6).png';
import pfp7 from '../assets/images/pfp/pfp (7).png';
import pfp8 from '../assets/images/pfp/pfp (8).png';
import pfp9 from '../assets/images/pfp/pfp (9).png';

import verified from '../assets/images/verified.png';

import cloud1 from '../assets/images/cloud (1).png';
import cloud2 from '../assets/images/cloud (2).png';

import profile_metrics from '../resources/profile_metrics';

const pfps = [pfp1, pfp2, pfp3, pfp4, pfp5, pfp6, pfp7, pfp8, pfp9];

const LOAD_TIME = 5000;
const CIRCLE_RADIUS = 48;
const CIRCLE_CIRCUM = 2 * Math.PI * CIRCLE_RADIUS;

const Landing = () => {
    const [pfpIndex, setPfpIndex] = useState(0);
    const [loadingKey, setLoadingKey] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef();
    const tickRef = useRef();
    const startTimeRef = useRef(Date.now());

    // Helper to clear and restart the interval
    const restartInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setPfpIndex(prev => (prev + 1) % pfps.length);
            setLoadingKey(prev => prev + 1); // force animation restart
            startTimeRef.current = Date.now();
            setProgress(0);
        }, LOAD_TIME);
    };

    useEffect(() => {
        restartInterval();
        return () => clearInterval(intervalRef.current);
        // eslint-disable-next-line
    }, []);

    // Loader tick for smooth progress
    useEffect(() => {
        if (tickRef.current) clearInterval(tickRef.current);
        tickRef.current = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            setProgress(Math.min(elapsed / LOAD_TIME, 1));
        }, 100); // update every 100ms
        return () => clearInterval(tickRef.current);
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
                        <span key={`loader-${loadingKey}`} className="pfp-loader">
                            <svg
                                className="pfp-loader-svg"
                                viewBox="0 0 100 100"
                                width="100%"
                                height="100%"
                            >
                                <defs>
                                    <linearGradient id="pfp-rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ff1a1a" />
                                        <stop offset="16%" stopColor="#ff6600" />
                                        <stop offset="32%" stopColor="#ffc300" />
                                        <stop offset="48%" stopColor="#b2ff00" />
                                        <stop offset="64%" stopColor="#00cc00" />
                                        <stop offset="80%" stopColor="#00bfff" />
                                        <stop offset="100%" stopColor="#1a00ff" />
                                    </linearGradient>
                                </defs>
                                <circle
                                    className="pfp-loader-bg"
                                    cx="50"
                                    cy="50"
                                    r="48"
                                    fill="none"
                                />
                                <circle
                                    className="pfp-loader-bar"
                                    cx="50"
                                    cy="50"
                                    r="48"
                                    fill="none"
                                    strokeDasharray={CIRCLE_CIRCUM}
                                    strokeDashoffset={CIRCLE_CIRCUM * (1 - progress)}
                                    style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                                />
                            </svg>
                        </span>
                        <img
                            key={`img-${loadingKey}`}
                            src={pfps[pfpIndex]}
                            alt="Profile"
                            className="pfp-image"
                            style={{ position: "relative", zIndex: 1 }}
                        />
                    </div>
                    <h1 className="name">James Yang</h1>
                    <div className="verified">
                        <img src={verified} alt="Verified" className="verified-icon" />
                        <span className="verified-text">Chronic Builder</span>
                    </div>
                    <p className="bio">Software engineer who turns caffeine into applications. Check out my recent experiments.</p>
                    <div className="metrics">
                        {profile_metrics.map((metric, index) => (
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