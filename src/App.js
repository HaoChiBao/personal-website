import './App.css';
import Background from './components/Background';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      {/* <Background background={1} /> */}
      <Landing />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
