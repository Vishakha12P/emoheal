import React from 'react';
import { Music2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Music.css';

const Music = () => {
  const { language } = useLanguage();
  
  return (
    <div className="music-container">
      <div className="music-header">
        <h1 className="music-title">
          <Music2 size={32} />
          {getTranslation(language, 'music.title')}
        </h1>
        <p className="music-description">
          {getTranslation(language, 'music.subtitle')}
        </p>
      </div>

      <div className="music-content">
        <div className="music-link-container">
          <a 
            href="https://music-section.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="music-link"
          >
            {getTranslation(language, 'music.visitSection')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Music;
