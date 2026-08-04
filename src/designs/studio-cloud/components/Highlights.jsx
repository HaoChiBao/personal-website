
import React from 'react';
import entries from '../data/entries';
import HighlightItem from './HighlightItem';

const Highlights = () => {
  return (
    <div className="highlights-section">
      <h3 className="section-title">Some of my highlights</h3>
      <div className="highlight-list">
        {entries.map((entry) => (
          <HighlightItem key={entry.id} entry={entry} />
        ))}
      </div>
      
      <h3 className="section-title" style={{ marginTop: '60px' }}>Projects I've worked on</h3>
      <div className="highlight-list">
          {/* Duplicating for demo purposes as seen in screenshot 1 */}
          {entries.map((entry) => (
          <HighlightItem key={`${entry.id}-2`} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Highlights;
