
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import entries from '../../v2/data/entries';
import './css/BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const entry = entries.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!entry) {
    return <div>Entry not found</div>;
  }

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
            src={entry.videoSrc} 
            controls 
            autoPlay 
            muted
          />
        </div>
        <div className="caption">
             Figure 1. pulling an all-nighter at the Boardy offices
        </div>

        <div className="post-content">
             <div className="sidebar">
                <h3 className="overview-title">Overview</h3>
                
                <div className="meta-grid">
                    <div className="meta-label">Worked As</div>
                    <div className="meta-value">Contract Software Developer</div>
                    
                    <div className="meta-label">Worked With</div>
                    <div className="meta-value">
                        Typescript<br/>
                        Python<br/>
                        Railway Deployment<br/>
                        Supabase<br/>
                        GraphQL
                    </div>
                </div>
             </div>

             <div className="main-text">
                <div className="story-section">
                    <h3>Story</h3>
                    <p className="story-text">
                        I participated in a Hackathon (Qhacks 2025) with my friend Owen Gretzinger.
                        We didn't win any prize<br/>
                        He posted about it.<br/>
                        Boardy team reached out to us to implement a similar feature to what we built<br/>
                        Over the span of ...<br/>
                        Today, the world is much safer. But the human brain hasn't changed much since those hunter-gatherer days. It's still stuck in the Stone Age. That's why, if you don't resist, the brain chooses the easiest paths to solve problems.
                    </p>
                </div>

                <div className="contributions-section">
                    <h3>Contributions</h3>
                     <p className="contribution-text">
                        Today, the world is much safer. But the human brain hasn't changed much since those hunter-gatherer days. It's still stuck in the Stone Age. That's why, if you don't resist, the brain chooses the easiest paths to solve problems.
                     </p>
                </div>

                <div className="outcomes-section">
                    <h3>Outcomes</h3>
                    <p className="outcome-text">
                        Deployed on Railway
                    </p>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
