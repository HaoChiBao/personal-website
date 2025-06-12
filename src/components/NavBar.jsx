import Glass from "./Glass";
import './css/NavBar.css';

const NavBar = () => {
    return (
        <Glass className="navbar">
            <nav>
                <div className="navbar-logo">
                    {/* James Yang */}
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
        </Glass>
    );
}

export default NavBar;