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

    // Log when all images, videos, and assets are loaded
    const onLoad = () => {
      console.log('All images, videos, and assets have loaded!');
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Landing />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
