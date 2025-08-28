import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Music, 
  Heart, 
  Dumbbell, 
  Sprout, 
  Shield,
  ArrowRight,
  Sparkles,
  Star,
  Quote
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Home.css';

const Home = () => {
  const { language } = useLanguage();
  
  const features = [
    {
      icon: MessageCircle,
      title: getTranslation(language, 'home.features.chatbot.title'),
      description: getTranslation(language, 'home.features.chatbot.description'),
      color: "#ec4899",
      path: "/chatbot"
    },
    {
      icon: Music,
      title: getTranslation(language, 'home.features.music.title'),
      description: getTranslation(language, 'home.features.music.description'),
      color: "#f59e0b",
      path: "/music"
    },
    {
      icon: Heart,
      title: getTranslation(language, 'home.features.meditation.title'),
      description: getTranslation(language, 'home.features.meditation.description'),
      color: "#10b981",
      path: "/meditation"
    },
    {
      icon: Dumbbell,
      title: getTranslation(language, 'home.features.exercise.title'),
      description: getTranslation(language, 'home.features.exercise.description'),
      color: "#3b82f6",
      path: "/exercise"
    },
    {
      icon: Sprout,
      title: getTranslation(language, 'home.features.nurture.title'),
      description: getTranslation(language, 'home.features.nurture.description'),
      color: "#84cc16",
      path: "/nurture"
    },
    {
      icon: Shield,
      title: getTranslation(language, 'home.features.quickReach.title'),
      description: getTranslation(language, 'home.features.quickReach.description'),
      color: "#ef4444",
      path: "/healing"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      journey: "Breast Cancer Survivor",
      content: "EMOHEAL became my sanctuary during treatment. The AI companion understood my fears when I couldn't put them into words, and the meditation sessions gave me strength I never knew I had.",
      rating: 5,
      avatar: "🌸"
    },
    {
      name: "Maria L.",
      journey: "Emotional Healing",
      content: "After losing my mother, I felt completely lost. This platform helped me process my grief and find hope again. The community here is incredibly supportive.",
      rating: 5,
      avatar: "💕"
    },
    {
      name: "Jennifer K.",
      journey: "Anxiety Recovery",
      content: "The music therapy sessions are magical. They helped me calm my racing thoughts and find peace in moments of overwhelming anxiety. I'm so grateful for this healing space.",
      rating: 5,
      avatar: "✨"
    },
    {
      name: "Amanda R.",
      journey: "Self-Care Journey",
      content: "EMOHEAL taught me that self-care isn't selfish. The nurture zone activities helped me rediscover joy and build healthy habits that support my emotional well-being.",
      rating: 5,
      avatar: "🌿"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.div 
            className="hero-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Sparkles size={20} />
            <span>{getTranslation(language, 'home.title')}</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
{getTranslation(language, 'home.subtitle')}
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
{getTranslation(language, 'home.description')}
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link to="/login" className="btn-primary">
{getTranslation(language, 'home.getStarted')}
              <ArrowRight size={20} />
            </Link>
            <Link to="/healing" className="btn-secondary">
              {getTranslation(language, 'home.learnMore')}
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="floating-elements">
            {/* Healing Journey Symbols */}
            <motion.div 
              className="floating-element healing-journey"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="journey-path">
                <div className="path-dot"></div>
                <div className="path-dot"></div>
                <div className="path-dot"></div>
                <div className="path-dot"></div>
              </div>
              <span className="journey-label">Healing Journey</span>
            </motion.div>

            {/* Emotional Support Elements */}
            <motion.div 
              className="floating-element emotional-support"
              animate={{
                y: [0, -15, 0],
                rotate: [0, -3, 3, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="support-hearts">
                <div className="heart-pulse"></div>
                <div className="heart-pulse"></div>
                <div className="heart-pulse"></div>
              </div>
              <span className="support-label">Emotional Support</span>
            </motion.div>

            {/* Growth & Transformation */}
            <motion.div 
              className="floating-element growth"
              animate={{
                y: [0, -25, 0],
                rotate: [0, 2, -2, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <div className="growth-spiral">
                <div className="spiral-ring"></div>
                <div className="spiral-ring"></div>
                <div className="spiral-ring"></div>
              </div>
              <span className="growth-label">Growth</span>
            </motion.div>

            {/* Community Connection */}
            <motion.div 
              className="floating-element community"
              animate={{
                y: [0, -18, 0],
                rotate: [0, -4, 4, 0],
                scale: [1, 1.08, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            >
              <div className="connection-lines">
                <div className="connection-line"></div>
                <div className="connection-line"></div>
                <div className="connection-line"></div>
              </div>
              <span className="community-label">Community</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="features">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Your Healing Toolkit</h2>
          <p className="section-description">
            Discover our comprehensive range of healing tools and resources designed 
            to support your emotional well-being and personal growth.
          </p>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <Link to={feature.path} className="feature-link">
                <div 
                  className="feature-icon"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon 
                    size={40} 
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">
                  <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Stories of Healing</h2>
          <p className="section-description">
            Real stories from our community members who found hope, strength, and healing through EMOHEAL.
          </p>
        </motion.div>

        <motion.div 
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="testimonial-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  <span className="avatar-emoji">{testimonial.avatar}</span>
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-journey">{testimonial.journey}</p>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                </div>
                <Quote size={24} className="quote-icon" />
              </div>
              <p className="testimonial-content">{testimonial.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="about-title">Why Choose EMOHEAL?</h2>
          <p className="about-description">
            EMOHEAL is more than just a platform—it's a sanctuary for your emotional well-being. 
            We understand that healing is a deeply personal journey, and we're committed to 
            providing you with the tools, support, and community you need to thrive. 
            Our approach combines evidence-based practices with compassionate care, 
            creating a safe space where you can explore, heal, and grow.
          </p>

          <motion.div 
            className="about-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Safe & Private</span>
            </div>
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Healing Resources</span>
            </div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Love & Care</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
