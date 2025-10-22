// ...existing code...
import ReactDOM from 'react-dom/client';
import './index.css';
// import Home from './pages/Home_version02';
import Home_V1 from './v1/pages/Home_version01';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/legacy/v1" element={<Home_V1 />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
// ...existing code..