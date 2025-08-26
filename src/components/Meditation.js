import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Heart, 
  Clock, 
  Target, 
  Moon,
  Sun,
  Wind,
  Sparkles,
  Timer
} from 'lucide-react';
import './Meditation.css';

const Meditation = () => {
  const [currentSession, setCurrentSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const intervalRef = useRef(null);
  const breathingIntervalRef = useRef(null);

  const sessions = [
    {
      id: 1,
      title: "Gentle Healing",
      description: "A gentle meditation to support your healing journey",
      duration: 10,
      type: "guided",
      icon: Heart,
      color: "#ec4899",
      instructions: "Find a comfortable position and let your body relax. Focus on your breath and allow healing energy to flow through you."
    },
    {
      id: 2,
      title: "Stress Relief",
      description: "Release tension and find inner peace",
      duration: 15,
      type: "guided",
      icon: Wind,
      color: "#3b82f6",
      instructions: "Breathe deeply and imagine stress leaving your body with each exhale. Feel yourself becoming lighter and more peaceful."
    },
    {
      id: 3,
      title: "Sleep Preparation",
      description: "Prepare your mind and body for restful sleep",
      duration: 20,
      type: "guided",
      icon: Moon,
      color: "#8b5cf6",
      instructions: "Let go of the day's worries and prepare your mind for sleep. Feel your body becoming heavy and relaxed."
    },
    {
      id: 4,
      title: "Morning Renewal",
      description: "Start your day with positive energy and hope",
      duration: 12,
      type: "guided",
      icon: Sun,
      color: "#f59e0b",
      instructions: "Welcome the new day with gratitude. Set positive intentions for your healing journey ahead."
    },
    {
      id: 5,
      title: "Breathing Exercise",
      description: "Simple breathing technique for immediate calm",
      duration: 5,
      type: "breathing",
      icon: Target,
      color: "#10b981",
      instructions: "Follow the breathing pattern: inhale for 4 counts, hold for 4, exhale for 4, hold for 4."
    },
    {
      id: 6,
      title: "Body Scan",
      description: "Connect with your body and release tension",
      duration: 18,
      type: "guided",
      icon: Sparkles,
      color: "#84cc16",
      instructions: "Scan your body from head to toe, releasing any tension you find. Honor your body's strength and resilience."
    }
  ];

  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, timeRemaining]);

  useEffect(() => {
    if (currentSession?.type === 'breathing' && isPlaying) {
      breathingIntervalRef.current = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === 'inhale') {
            setBreathingCount(c => c + 1);
            return 'hold1';
          } else if (prev === 'hold1') {
            return 'exhale';
          } else if (prev === 'exhale') {
            return 'hold2';
          } else {
            return 'inhale';
          }
        });
      }, 4000); // 4 seconds per phase
    } else {
      clearInterval(breathingIntervalRef.current);
    }

    return () => clearInterval(breathingIntervalRef.current);
  }, [currentSession, isPlaying]);

  const startSession = (session) => {
    setCurrentSession(session);
    setTimeRemaining(session.duration * 60);
    setIsPlaying(true);
    setBreathingCount(0);
    setBreathingPhase('inhale');
  };

  const handleSessionEnd = () => {
    setIsPlaying(false);
    setTimeRemaining(0);
    setBreathingPhase('inhale');
    setBreathingCount(0);
  };

  const pauseSession = () => {
    setIsPlaying(false);
  };

  const resumeSession = () => {
    setIsPlaying(true);
  };

  const stopSession = () => {
    setIsPlaying(false);
    setCurrentSession(null);
    setTimeRemaining(0);
    setBreathingPhase('inhale');
    setBreathingCount(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale':
        return 'Inhale deeply...';
      case 'hold1':
        return 'Hold...';
      case 'exhale':
        return 'Exhale slowly...';
      case 'hold2':
        return 'Hold...';
      default:
        return 'Breathe naturally...';
    }
  };

  return (
    <div className="meditation-container">
      <div className="meditation-header">
        <h1 className="meditation-title">
          <Heart size={32} />
          Meditation & Mindfulness
        </h1>
        <p className="meditation-description">
          Guided meditation sessions to help you find inner peace and emotional balance
        </p>
      </div>

      <div className="meditation-content">
        {/* Active Session */}
        {currentSession && (
          <motion.div 
            className="active-session"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="session-card active">
              <div className="session-header">
                <div className="session-icon" style={{ backgroundColor: `${currentSession.color}20` }}>
                  <currentSession.icon size={24} style={{ color: currentSession.color }} />
                </div>
                <div className="session-info">
                  <h3 className="session-title">{currentSession.title}</h3>
                  <p className="session-description">{currentSession.description}</p>
                </div>
                <div className="session-timer">
                  <Timer size={20} />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              </div>

              {currentSession.type === 'breathing' ? (
                <div className="breathing-exercise">
                  <div className="breathing-circle">
                    <motion.div
                      className="breathing-indicator"
                      animate={{
                        scale: breathingPhase === 'inhale' ? 1.2 : 1,
                        opacity: breathingPhase === 'inhale' ? 0.8 : 0.4
                      }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                  <div className="breathing-instruction">
                    <h4>{getBreathingInstruction()}</h4>
                    <p>Breath #{breathingCount}</p>
                  </div>
                </div>
              ) : (
                <div className="guided-session">
                  <div className="session-instructions">
                    <h4>Instructions:</h4>
                    <p>{currentSession.instructions}</p>
                  </div>
                </div>
              )}

              <div className="session-controls">
                {isPlaying ? (
                  <motion.button
                    className="control-btn pause"
                    onClick={pauseSession}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Pause size={24} />
                    Pause
                  </motion.button>
                ) : (
                  <motion.button
                    className="control-btn play"
                    onClick={resumeSession}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={24} />
                    Resume
                  </motion.button>
                )}
                
                <motion.button
                  className="control-btn stop"
                  onClick={stopSession}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Stop Session
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Available Sessions */}
        <div className="sessions-section">
          <h2 className="section-title">Available Sessions</h2>
          <div className="sessions-grid">
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                className="session-card"
                onClick={() => startSession(session)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--session-color': session.color }}
              >
                <div className="session-icon" style={{ backgroundColor: `${session.color}20` }}>
                  <session.icon size={24} style={{ color: session.color }} />
                </div>
                <div className="session-content">
                  <h3 className="session-title">{session.title}</h3>
                  <p className="session-description">{session.description}</p>
                  <div className="session-meta">
                    <span className="session-duration">
                      <Clock size={16} />
                      {session.duration} min
                    </span>
                    <span className="session-type">
                      {session.type === 'breathing' ? 'Breathing' : 'Guided'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h2 className="section-title">Benefits of Meditation</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Heart size={24} />
              </div>
              <h3>Reduces Stress</h3>
              <p>Lower cortisol levels and promote emotional well-being</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Target size={24} />
              </div>
              <h3>Improves Focus</h3>
              <p>Enhance concentration and mental clarity</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Moon size={24} />
              </div>
              <h3>Better Sleep</h3>
              <p>Improve sleep quality and restfulness</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Sparkles size={24} />
              </div>
              <h3>Emotional Balance</h3>
              <p>Find inner peace and emotional stability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditation;
