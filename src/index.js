// ...existing code...
import ReactDOM from 'react-dom/client';
import './index.css';
// import Home from './pages/Home_version02';
import Home_V1 from './v1/pages/Home_version01';
// import Home_V2 from './v2/pages/Home_V2';
import BlogPage from './v1/pages/BlogPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Home_V1 />} />
      {/* <Route path="/legacy/v1" element={<Home_V1 />} /> */}
      {/* <Route path="/v2" element={<Home_V2 />} /> */}
      <Route path="/blog/:id" element={<BlogPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
// ...existing code..