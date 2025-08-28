import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <div className="language-switcher">
      <motion.div
        className="language-dropdown"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="language-trigger">
          <Globe size={18} />
          <span className="current-language">
            {language === 'en' ? 'EN' : 'हि'}
          </span>
        </div>
        
        <div className="language-options">
          <motion.button
            className={`language-option ${language === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <span className="language-flag">🇺🇸</span>
            <span>English</span>
          </motion.button>
          
          <motion.button
            className={`language-option ${language === 'hi' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('hi')}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <span className="language-flag">🇮🇳</span>
            <span>हिंदी</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSwitcher;
