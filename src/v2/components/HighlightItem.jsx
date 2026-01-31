
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HighlightItem = ({ entry }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    navigate(`/v2/blog/${entry.id}`);
  };

  return (
    <div 
      className="highlight-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="highlight-header">
          <div className="avatar-placeholder"></div>
          <div className="highlight-title">
              {entry.title}
              <span className="arrow-icon">↗</span>
          </div>
      </div>

      <div className="highlight-metadata">
        <div className="highlight-role">{entry.role}</div>
        <div className="highlight-date">{entry.date}</div>
      </div>

      <div className={`video-spacer ${isHovered ? 'expanded' : ''}`}></div>

      {/* The Single Video Element that moves and grows */}
      <div className={`magic-video-container ${isHovered ? 'expanded' : ''}`}>
           <video 
              ref={videoRef}
              src={entry.videoSrc}
              muted 
              loop 
              playsInline
              className="highlight-video-element"
           />
      </div>
    </div>
  );
};

export default HighlightItem;
