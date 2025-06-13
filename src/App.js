import './App.css';

import Background from './components/Background';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Projects from './components/Projects';

function App() {
  return (
    <div className="App">
      <Background />

      <NavBar />
      <Landing />
      <Projects />
    </div>
  );
}

export default App;
