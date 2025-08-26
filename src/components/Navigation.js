import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  Music, 
  Heart, 
  Dumbbell, 
  Sprout, 
  Shield,
  Menu,
  X
} from 'lucide-react';
import './Navigation.css';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/', name: 'Home', icon: Home, color: '#8b5cf6' },
    { path: '/chatbot', name: 'Bestie', icon: MessageCircle, color: '#ec4899' },
    { path: '/music', name: 'Music', icon: Music, color: '#f59e0b' },
    { path: '/meditation', name: 'Meditation', icon: Heart, color: '#10b981' },
    { path: '/exercise', name: 'Exercise', icon: Dumbbell, color: '#3b82f6' },
    { path: '/nurture', name: 'Nurture Zone', icon: Sprout, color: '#84cc16' },
    { path: '/healing', name: 'Healing Circle', icon: Shield, color: '#ef4444' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setCurrentPage('home')}>
          <motion.div
            className="logo-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logo-icon">❤️</div>
            <span className="logo-text gradient-text">EMOHEAL</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage(item.name.toLowerCase());
                  setIsMobileMenuOpen(false);
                }}
              >
                <motion.div
                  className="nav-item"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ '--hover-color': item.color }}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activeIndicator"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage(item.name.toLowerCase());
                setIsMobileMenuOpen(false);
              }}
            >
              <motion.div
                className="mobile-nav-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ '--hover-color': item.color }}
              >
                <Icon size={24} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    className="mobile-active-indicator"
                    layoutId="mobileActiveIndicator"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
};

export default Navigation;
