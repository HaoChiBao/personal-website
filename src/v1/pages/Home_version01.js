import NavBar from '../components/NavBar';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

import { useEffect } from 'react';

function Home() {
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
    <div className="Home" style = {{width: '100vw'}}>
      <NavBar />
      <Landing />
      <Projects />
      <Footer />
    </div>
  );
}

export default Home;
