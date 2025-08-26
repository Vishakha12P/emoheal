import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  Heart, 
  BookOpen, 
  Camera, 
  Palette,
  Coffee,
  Bath,
  Star,
  CheckCircle,
  Plus
} from 'lucide-react';
import './NurtureZone.css';

const NurtureZone = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [completedActivities, setCompletedActivities] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

  const activities = [
    {
      id: 1,
      title: "Gratitude Journal",
      description: "Write down three things you're grateful for today",
      icon: BookOpen,
      color: "#10b981",
      type: "journal",
      duration: "5 min"
    },
    {
      id: 2,
      title: "Self-Massage",
      description: "Gentle massage techniques for relaxation",
      icon: Heart,
      color: "#ec4899",
      type: "physical",
      duration: "10 min"
    },
    {
      id: 3,
      title: "Creative Expression",
      description: "Draw, paint, or create something beautiful",
      icon: Palette,
      color: "#f59e0b",
      type: "creative",
      duration: "15 min"
    },
    {
      id: 4,
      title: "Nature Connection",
      description: "Spend time in nature or look at nature photos",
      icon: Sprout,
      color: "#84cc16",
      type: "nature",
      duration: "10 min"
    },
    {
      id: 5,
      title: "Warm Bath",
      description: "Relaxing bath with calming essential oils",
      icon: Bath,
      color: "#3b82f6",
      type: "physical",
      duration: "20 min"
    },
    {
      id: 6,
      title: "Positive Affirmations",
      description: "Repeat positive statements about yourself",
      icon: Star,
      color: "#8b5cf6",
      type: "mental",
      duration: "5 min"
    },
    {
      id: 7,
      title: "Tea Ritual",
      description: "Mindful tea drinking with calming herbs",
      icon: Coffee,
      color: "#ef4444",
      type: "ritual",
      duration: "10 min"
    },
    {
      id: 8,
      title: "Photo Memories",
      description: "Look through happy photos and memories",
      icon: Camera,
      color: "#06b6d4",
      type: "emotional",
      duration: "15 min"
    }
  ];

  const affirmations = [
    "I am strong and capable of healing",
    "My body is working hard to restore my health",
    "I deserve love, care, and support",
    "I am surrounded by people who care about me",
    "Each day I grow stronger and more resilient",
    "I trust in my body's ability to heal",
    "I am worthy of taking time for myself",
    "My feelings are valid and important",
    "I am making progress every day",
    "I choose to focus on what brings me joy"
  ];

  const completeActivity = (activity) => {
    if (!completedActivities.includes(activity.id)) {
      setCompletedActivities([...completedActivities, activity.id]);
    }
    setSelectedActivity(null);
  };

  const addJournalEntry = () => {
    if (newJournalEntry.trim()) {
      const entry = {
        id: Date.now(),
        content: newJournalEntry,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toLocaleTimeString()
      };
      setJournalEntries([entry, ...journalEntries]);
      setNewJournalEntry('');
    }
  };

  const getRandomAffirmation = () => {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
  };

  return (
    <div className="nurture-container">
      <div className="nurture-header">
        <h1 className="nurture-title">
          <Sprout size={32} />
          Nurture Zone
        </h1>
        <p className="nurture-description">
          A safe space for self-care activities and personal growth
        </p>
      </div>

      <div className="nurture-content">
        {/* Daily Affirmation */}
        <div className="affirmation-section">
          <motion.div 
            className="affirmation-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="affirmation-icon">
              <Star size={24} />
            </div>
            <div className="affirmation-content">
              <h3>Today's Affirmation</h3>
              <p className="affirmation-text">"{getRandomAffirmation()}"</p>
              <button 
                className="refresh-btn"
                onClick={() => window.location.reload()}
              >
                New Affirmation
              </button>
            </div>
          </motion.div>
        </div>

        {/* Self-Care Activities */}
        <div className="activities-section">
          <h2 className="section-title">Self-Care Activities</h2>
          <div className="activities-grid">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                className={`activity-card ${completedActivities.includes(activity.id) ? 'completed' : ''}`}
                onClick={() => setSelectedActivity(activity)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--activity-color': activity.color }}
              >
                <div className="activity-icon" style={{ backgroundColor: `${activity.color}20` }}>
                  <activity.icon size={24} style={{ color: activity.color }} />
                </div>
                <div className="activity-content">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-description">{activity.description}</p>
                  <div className="activity-meta">
                    <span className="activity-duration">{activity.duration}</span>
                    {completedActivities.includes(activity.id) && (
                      <CheckCircle size={16} className="completed-icon" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Modal */}
        {selectedActivity && (
          <motion.div 
            className="activity-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-icon" style={{ backgroundColor: `${selectedActivity.color}20` }}>
                  <selectedActivity.icon size={24} style={{ color: selectedActivity.color }} />
                </div>
                <h3>{selectedActivity.title}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedActivity(null)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>{selectedActivity.description}</p>
                <div className="activity-instructions">
                  <h4>How to practice:</h4>
                  <ul>
                    <li>Find a comfortable, quiet space</li>
                    <li>Set aside {selectedActivity.duration} for this activity</li>
                    <li>Focus on the present moment</li>
                    <li>Be gentle with yourself</li>
                  </ul>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  className="complete-btn"
                  onClick={() => completeActivity(selectedActivity)}
                >
                  Mark as Complete
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Journal Section */}
        <div className="journal-section">
          <h2 className="section-title">Gratitude Journal</h2>
          <div className="journal-container">
            <div className="journal-input">
              <textarea
                value={newJournalEntry}
                onChange={(e) => setNewJournalEntry(e.target.value)}
                placeholder="Write down what you're grateful for today..."
                className="journal-textarea"
              />
              <button 
                className="add-entry-btn"
                onClick={addJournalEntry}
                disabled={!newJournalEntry.trim()}
              >
                <Plus size={16} />
                Add Entry
              </button>
            </div>
            
            <div className="journal-entries">
              {journalEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  className="journal-entry"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="entry-content">{entry.content}</div>
                  <div className="entry-meta">
                    <span>{entry.date}</span>
                    <span>{entry.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <h2 className="section-title">Your Self-Care Progress</h2>
          <div className="progress-stats">
            <div className="stat-card">
              <div className="stat-number">{completedActivities.length}</div>
              <div className="stat-label">Activities Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{journalEntries.length}</div>
              <div className="stat-label">Journal Entries</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {Math.round((completedActivities.length / activities.length) * 100)}%
              </div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurtureZone;
