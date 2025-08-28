import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Heart,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Login.css';

const Login = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to chatbot (bestie section) after successful login
      navigate('/chatbot');
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="login">
      <motion.div 
        className="login-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="login-header" variants={itemVariants}>
          <div className="login-logo">
            <Heart className="logo-icon" />
            <Sparkles className="sparkle-icon" />
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Continue your healing journey with EMOHEAL
          </p>
        </motion.div>

        <motion.form 
          className="login-form"
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <Mail size={18} />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <Lock size={18} />
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox" />
              <span className="checkbox-text">Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <motion.button
            type="submit"
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                Sign In
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div className="login-footer" variants={itemVariants}>
          <p className="signup-prompt">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Sign up for free
            </Link>
          </p>
          
          <div className="social-login">
            <p className="social-text">Or continue with</p>
            <div className="social-buttons">
              <button className="social-btn google">
                <span className="social-icon">G</span>
                Google
              </button>
              <button className="social-btn facebook">
                <span className="social-icon">f</span>
                Facebook
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div className="login-features" variants={itemVariants}>
          <h3 className="features-title">What awaits you:</h3>
          <ul className="features-list">
            <li>🤖 Personal AI companion for emotional support</li>
            <li>🎵 Curated healing music and soundscapes</li>
            <li>🧘 Guided meditation and mindfulness exercises</li>
            <li>💪 Personalized wellness activities</li>
            <li>🌱 Safe community for sharing and growth</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
