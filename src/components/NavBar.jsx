import './css/NavBar.css';
import { useEffect, useRef, useState } from 'react';

import useScramble from '../hooks/useScramble';

const NavBar = () => {
    const navRef = useRef(null);
    const [active, setActive] = useState(false);
    const lastScroll = useRef(window.scrollY);

    const [scrambledHeading, headingRef] = useScramble("James Yang", 500);


    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll <= 40) {
                setActive(false); // At the top, hide
            } else if (currentScroll > lastScroll.current) {
                setActive(true); // scrolling down, hide
            } else {
                setActive(false); // scrolling up, show
            }
            lastScroll.current = currentScroll;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav ref={navRef} className={active ? 'active' : ''}>
            <div className="navbar-logo" ref = {headingRef}>
                {scrambledHeading}
            </div>
            <ul className="navbar-links">
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
                <li>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        Resume
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;