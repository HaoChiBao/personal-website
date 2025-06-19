import './css/NavBar.css';
import { useEffect, useRef, useState } from 'react';

const NavBar = () => {
    const navRef = useRef(null);
    const [active, setActive] = useState(true);
    const lastScroll = useRef(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScroll.current) {
                setActive(false); // scrolling down, hide
            } else {
                setActive(true); // scrolling up, show
            }
            lastScroll.current = currentScroll;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav ref={navRef} className={active ? 'active' : ''}>
            <div className="navbar-logo">
                James Yang
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