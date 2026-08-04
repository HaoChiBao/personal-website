
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {highlight_projects} from '../resources/highlight_projects';
import './css/BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const entry = highlight_projects.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!entry) {
    return <div>Entry not found</div>;
  }


  const { overview, story, contributions, outcomes, caption } = entry;

  return (
    <div className="v2-container">
      <div className="headers">
        <div className="header-left" style={{ fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/v2')}>
          James Yang
        </div>
        <div className="header-right">
             <div>2025.06.18</div>
        </div>
      </div>

      <div className="fade-in">
        <h1 className="post-title">{entry.title}</h1>
        <div className="post-date-range">{entry.date}</div>


        <div className="hero-video-container">
          <video 
            className="hero-video" 
            src={entry.video} 
            controls 
            autoPlay 
            muted
          />
        </div>

        <div className="caption">
             {caption || "Figure."}
        </div>

        <div className="sidebar">
            <h3 className="overview-title">Overview</h3>
            
            <div className="meta-grid">

                <div className="meta-label">Worked As</div>
                <div className="meta-value">{overview?.worked_as}</div>
                
                <div className="meta-label">Worked With</div>
                <div className="meta-value tech-stack-list">
                    {overview?.worked_with?.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                </div>
                {overview?.summary && (
                    <div style={{gridColumn: '1 / -1', marginBottom: '24px', lineHeight: '1.6'}}>
                        {overview.summary}
                    </div>
                )}
            </div>
        </div>
        
        <div className="post-content">


             <div className="main-text">
                {story && (
                    <div className="story-section">
                        <h3>Story</h3>
                        <p className="story-text" style={{ whiteSpace: 'pre-line' }}>
                            {story}
                        </p>
                    </div>
                )}

                {contributions && (
                    <div className="contributions-section">
                        <h3>Contributions</h3>
                         <p className="contribution-text" style={{ whiteSpace: 'pre-line' }}>
                            {contributions}
                         </p>
                    </div>
                )}

                {outcomes && (
                    <div className="outcomes-section">
                        <h3>Outcomes</h3>
                        <p className="outcome-text" style={{ whiteSpace: 'pre-line' }}>
                            {outcomes}
                        </p>
                    </div>
                )}
             </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
