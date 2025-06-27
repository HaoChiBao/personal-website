import './App.css';
import Background from './components/Background';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Projects from './components/Projects';
import Footer from './components/Footer';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('data-theme');
    const theme = storedTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <div className="App">
      <NavBar />
      {/* <Background background={1} /> */}
      <Landing />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
