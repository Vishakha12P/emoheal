import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Play, 
  Pause, 
  Clock, 
  Target, 
  Heart,
  Activity,
  Timer,
  CheckCircle
} from 'lucide-react';
import './Exercise.css';

const Exercise = () => {
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const workouts = [
    {
      id: 1,
      title: "Gentle Stretching",
      description: "Light stretching to improve flexibility and reduce stiffness",
      duration: 15,
      difficulty: "Beginner",
      icon: Activity,
      color: "#10b981",
      exercises: [
        { name: "Arm Circles", duration: 60, description: "Gentle circular motions with your arms" },
        { name: "Shoulder Rolls", duration: 60, description: "Roll your shoulders forward and backward" },
        { name: "Neck Stretches", duration: 60, description: "Gentle neck stretches to release tension" },
        { name: "Deep Breathing", duration: 60, description: "Focus on deep, calming breaths" }
      ]
    },
    {
      id: 2,
      title: "Walking in Place",
      description: "Low-impact cardio to boost energy and mood",
      duration: 20,
      difficulty: "Beginner",
      icon: Heart,
      color: "#3b82f6",
      exercises: [
        { name: "Warm-up Walk", duration: 120, description: "Start with gentle walking in place" },
        { name: "Arm Swings", duration: 120, description: "Add gentle arm movements while walking" },
        { name: "Knee Lifts", duration: 120, description: "Gently lift knees while maintaining balance" },
        { name: "Cool-down", duration: 120, description: "Gradually slow down your movements" }
      ]
    },
    {
      id: 3,
      title: "Chair Exercises",
      description: "Seated exercises for strength and mobility",
      duration: 18,
      difficulty: "Beginner",
      icon: Target,
      color: "#f59e0b",
      exercises: [
        { name: "Seated Marching", duration: 90, description: "March in place while seated" },
        { name: "Arm Raises", duration: 90, description: "Raise arms overhead while seated" },
        { name: "Leg Extensions", duration: 90, description: "Extend legs forward while seated" },
        { name: "Seated Twists", duration: 90, description: "Gentle torso twists while seated" }
      ]
    },
    {
      id: 4,
      title: "Balance & Stability",
      description: "Exercises to improve balance and prevent falls",
      duration: 12,
      difficulty: "Beginner",
      icon: Dumbbell,
      color: "#8b5cf6",
      exercises: [
        { name: "Standing Balance", duration: 60, description: "Stand on one leg with support" },
        { name: "Heel-to-Toe Walk", duration: 60, description: "Walk heel-to-toe in a straight line" },
        { name: "Side Leg Raises", duration: 60, description: "Raise leg to the side while holding support" },
        { name: "Balance Recovery", duration: 60, description: "Practice recovering from slight imbalance" }
      ]
    }
  ];

  const startWorkout = (workout) => {
    setCurrentWorkout(workout);
    setCurrentExercise(0);
    setTimeRemaining(workout.exercises[0].duration);
    setIsPlaying(true);
  };

  const pauseWorkout = () => {
    setIsPlaying(false);
  };

  const resumeWorkout = () => {
    setIsPlaying(true);
  };

  const stopWorkout = () => {
    setIsPlaying(false);
    setCurrentWorkout(null);
    setCurrentExercise(0);
    setTimeRemaining(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <h1 className="exercise-title">
          <Dumbbell size={32} />
          Gentle Exercise
        </h1>
        <p className="exercise-description">
          Safe and gentle exercise routines designed for your recovery and well-being
        </p>
      </div>

      <div className="exercise-content">
        {/* Active Workout */}
        {currentWorkout && (
          <motion.div 
            className="active-workout"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="workout-card active">
              <div className="workout-header">
                <div className="workout-icon" style={{ backgroundColor: `${currentWorkout.color}20` }}>
                  <currentWorkout.icon size={24} style={{ color: currentWorkout.color }} />
                </div>
                <div className="workout-info">
                  <h3 className="workout-title">{currentWorkout.title}</h3>
                  <p className="workout-description">{currentWorkout.description}</p>
                </div>
                <div className="workout-timer">
                  <Timer size={20} />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              </div>

              <div className="current-exercise">
                <h4>Current Exercise:</h4>
                <div className="exercise-details">
                  <h5>{currentWorkout.exercises[currentExercise]?.name}</h5>
                  <p>{currentWorkout.exercises[currentExercise]?.description}</p>
                </div>
              </div>

              <div className="exercise-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${((currentExercise + 1) / currentWorkout.exercises.length) * 100}%` }}
                  />
                </div>
                <span>{currentExercise + 1} of {currentWorkout.exercises.length} exercises</span>
              </div>

              <div className="workout-controls">
                {isPlaying ? (
                  <motion.button
                    className="control-btn pause"
                    onClick={pauseWorkout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Pause size={24} />
                    Pause
                  </motion.button>
                ) : (
                  <motion.button
                    className="control-btn play"
                    onClick={resumeWorkout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={24} />
                    Resume
                  </motion.button>
                )}
                
                <motion.button
                  className="control-btn stop"
                  onClick={stopWorkout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Stop Workout
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Available Workouts */}
        <div className="workouts-section">
          <h2 className="section-title">Available Workouts</h2>
          <div className="workouts-grid">
            {workouts.map((workout) => (
              <motion.div
                key={workout.id}
                className="workout-card"
                onClick={() => startWorkout(workout)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--workout-color': workout.color }}
              >
                <div className="workout-icon" style={{ backgroundColor: `${workout.color}20` }}>
                  <workout.icon size={24} style={{ color: workout.color }} />
                </div>
                <div className="workout-content">
                  <h3 className="workout-title">{workout.title}</h3>
                  <p className="workout-description">{workout.description}</p>
                  <div className="workout-meta">
                    <span className="workout-duration">
                      <Clock size={16} />
                      {workout.duration} min
                    </span>
                    <span className="workout-difficulty">
                      {workout.difficulty}
                    </span>
                  </div>
                  <div className="workout-exercises">
                    <h4>Exercises:</h4>
                    <ul>
                      {workout.exercises.map((exercise, index) => (
                        <li key={index}>
                          <CheckCircle size={14} />
                          {exercise.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h2 className="section-title">Benefits of Gentle Exercise</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Heart size={24} />
              </div>
              <h3>Improves Energy</h3>
              <p>Boost your energy levels and reduce fatigue</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Target size={24} />
              </div>
              <h3>Enhances Mood</h3>
              <p>Release endorphins and improve emotional well-being</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Activity size={24} />
              </div>
              <h3>Increases Strength</h3>
              <p>Build gentle strength and improve mobility</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Dumbbell size={24} />
              </div>
              <h3>Better Sleep</h3>
              <p>Improve sleep quality through gentle movement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
