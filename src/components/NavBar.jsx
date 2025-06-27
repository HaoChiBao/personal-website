import './css/NavBar.css';
import { useEffect, useRef, useState } from 'react';
import useScramble from '../hooks/useScramble';

const NavBar = () => {
  const navRef = useRef(null);
  const [active, setActive] = useState(false);
  const lastScroll = useRef(window.scrollY);
  const [scrambledHeading, headingRef] = useScramble("James Yang", 500);

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
        setActive(true);
      } else if (currentScroll > lastScroll.current) {
        setActive(true);
      } else {
        setActive(false);
      }
      lastScroll.current = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={navRef} className={active ? 'active' : ''}>
      <div className="navbar-logo" ref={headingRef}>
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
        <li>
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer', fontSize: '1rem' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
