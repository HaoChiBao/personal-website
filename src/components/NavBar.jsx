import './css/NavBar.css';

import moon from '../assets/images/theme-moon.png'
import sun from '../assets/images/theme-sun.png';

import { useEffect, useRef, useState } from 'react';
import useScramble from '../hooks/useScramble';

const NavBar = () => {
  const navRef = useRef(null);
  const [active, setActive] = useState(false);
  const lastScroll = useRef(window.scrollY);
  const [scrambledHeading, headingRef] = useScramble("James Yang", 500);

  // Hamburger menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Load darkMode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('data-theme');
    return stored ? stored === 'dark' : false;
  });

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('data-theme', theme);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 40) {
        setActive(false);
      } else if (currentScroll > lastScroll.current) {
        setActive(true);
      } else {
        setActive(false);
      }
      lastScroll.current = currentScroll;
      // Close hamburger menu on scroll
      setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav ref={navRef} className={active ? 'active' : ''}>
      <div className="navbar-logo" ref={headingRef}>
        {scrambledHeading}
      </div>
      <button
        className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
        <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
        <li>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
            Resume
          </a>
        </li>
        <li>
          <button
            onClick={() => { toggleTheme(); handleNavClick(); }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-color)',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {darkMode ? 
            <img src={moon} alt="dark" /> 
            : 
            <img src={sun} alt="light" /> 
            }
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
