import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Heart, 
  Star, 
  Send,
  User,
  Calendar,
  MapPin,
  CheckCircle
} from 'lucide-react';
import './HealingCircle.css';

const HealingCircle = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Sarah",
      content: "Just wanted to share that today was a good day. Small victories matter! 💕",
      timestamp: "2 hours ago",
      likes: 12
    },
    {
      id: 2,
      user: "Maria",
      content: "Thank you all for your support. This community means so much to me.",
      timestamp: "4 hours ago",
      likes: 8
    },
    {
      id: 3,
      user: "Jennifer",
      content: "Remember, you're not alone in this journey. We're all here for each other.",
      timestamp: "6 hours ago",
      likes: 15
    }
  ]);

  const supportGroups = [
    {
      id: 1,
      name: "Early Stage Support",
      description: "For those newly diagnosed and beginning their journey",
      members: 45,
      icon: Heart,
      color: "#ec4899",
      nextMeeting: "Tomorrow, 2:00 PM",
      location: "Virtual Meeting"
    },
    {
      id: 2,
      name: "Treatment Warriors",
      description: "Support during active treatment and recovery",
      members: 67,
      icon: Shield,
      color: "#3b82f6",
      nextMeeting: "Thursday, 7:00 PM",
      location: "Virtual Meeting"
    },
    {
      id: 3,
      name: "Survivor Stories",
      description: "Sharing experiences and hope for the future",
      members: 89,
      icon: Star,
      color: "#f59e0b",
      nextMeeting: "Saturday, 10:00 AM",
      location: "Virtual Meeting"
    },
    {
      id: 4,
      name: "Caregiver Support",
      description: "Support for family members and caregivers",
      members: 34,
      icon: Users,
      color: "#10b981",
      nextMeeting: "Wednesday, 6:00 PM",
      location: "Virtual Meeting"
    }
  ];

  const resources = [
    {
      title: "Understanding Your Diagnosis",
      description: "Educational resources about breast cancer",
      type: "Education",
      color: "#8b5cf6"
    },
    {
      title: "Treatment Options",
      description: "Information about different treatment approaches",
      type: "Medical",
      color: "#3b82f6"
    },
    {
      title: "Coping Strategies",
      description: "Mental health and emotional support resources",
      type: "Wellness",
      color: "#10b981"
    },
    {
      title: "Financial Support",
      description: "Resources for managing treatment costs",
      type: "Practical",
      color: "#f59e0b"
    }
  ];

  const addMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: "You",
        content: newMessage,
        timestamp: "Just now",
        likes: 0
      };
      setMessages([message, ...messages]);
      setNewMessage('');
    }
  };

  const likeMessage = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  return (
    <div className="healing-container">
      <div className="healing-header">
        <h1 className="healing-title">
          <Shield size={32} />
          Healing Circle
        </h1>
        <p className="healing-description">
          Connect with others on similar journeys in a supportive community
        </p>
      </div>

      <div className="healing-content">
        {/* Support Groups */}
        <div className="groups-section">
          <h2 className="section-title">Support Groups</h2>
          <div className="groups-grid">
            {supportGroups.map((group) => (
              <motion.div
                key={group.id}
                className="group-card"
                onClick={() => setSelectedGroup(group)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--group-color': group.color }}
              >
                <div className="group-icon" style={{ backgroundColor: `${group.color}20` }}>
                  <group.icon size={24} style={{ color: group.color }} />
                </div>
                <div className="group-content">
                  <h3 className="group-name">{group.name}</h3>
                  <p className="group-description">{group.description}</p>
                  <div className="group-meta">
                    <span className="group-members">
                      <Users size={16} />
                      {group.members} members
                    </span>
                    <span className="group-meeting">
                      <Calendar size={16} />
                      {group.nextMeeting}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Chat */}
        <div className="chat-section">
          <h2 className="section-title">Community Chat</h2>
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.user === "You" ? "own" : "other"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    <User size={16} />
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-user">{message.user}</span>
                      <span className="message-time">{message.timestamp}</span>
                    </div>
                    <div className="message-text">{message.content}</div>
                    <div className="message-actions">
                      <button 
                        className="like-btn"
                        onClick={() => likeMessage(message.id)}
                      >
                        <Heart size={14} />
                        {message.likes}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="chat-input">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts, ask for support, or offer encouragement..."
                className="message-textarea"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addMessage();
                  }
                }}
              />
              <button 
                className="send-btn"
                onClick={addMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="resources-section">
          <h2 className="section-title">Helpful Resources</h2>
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                className="resource-card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--resource-color': resource.color }}
              >
                <div className="resource-header">
                  <h3 className="resource-title">{resource.title}</h3>
                  <span className="resource-type">{resource.type}</span>
                </div>
                <p className="resource-description">{resource.description}</p>
                <button className="resource-btn">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="guidelines-section">
          <h2 className="section-title">Community Guidelines</h2>
          <div className="guidelines-content">
            <div className="guideline-item">
              <CheckCircle size={20} />
              <span>Be kind and supportive to all members</span>
            </div>
            <div className="guideline-item">
              <CheckCircle size={20} />
              <span>Respect everyone's privacy and personal experiences</span>
            </div>
            <div className="guideline-item">
              <CheckCircle size={20} />
              <span>Share from your own experience, not medical advice</span>
            </div>
            <div className="guideline-item">
              <CheckCircle size={20} />
              <span>This is a safe space - no judgment or criticism</span>
            </div>
            <div className="guideline-item">
              <CheckCircle size={20} />
              <span>Report any inappropriate behavior to moderators</span>
            </div>
          </div>
        </div>

        {/* Group Modal */}
        {selectedGroup && (
          <motion.div 
            className="group-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-icon" style={{ backgroundColor: `${selectedGroup.color}20` }}>
                  <selectedGroup.icon size={24} style={{ color: selectedGroup.color }} />
                </div>
                <h3>{selectedGroup.name}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedGroup(null)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>{selectedGroup.description}</p>
                <div className="group-details">
                  <div className="detail-item">
                    <Users size={16} />
                    <span>{selectedGroup.members} members</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Next meeting: {selectedGroup.nextMeeting}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{selectedGroup.location}</span>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="join-btn">
                  Join Group
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HealingCircle;
