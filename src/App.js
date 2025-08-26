import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Music from './components/Music';
import Meditation from './components/Meditation';
import Exercise from './components/Exercise';
import NurtureZone from './components/NurtureZone';
import HealingCircle from './components/HealingCircle';
import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <Router>
      <div className="App">
        <ParticleBackground />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    key="home"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Home />
                  </motion.div>
                } 
              />
              <Route 
                path="/chatbot" 
                element={
                  <motion.div
                    key="chatbot"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Chatbot />
                  </motion.div>
                } 
              />
              <Route 
                path="/music" 
                element={
                  <motion.div
                    key="music"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Music />
                  </motion.div>
                } 
              />
              <Route 
                path="/meditation" 
                element={
                  <motion.div
                    key="meditation"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Meditation />
                  </motion.div>
                } 
              />
              <Route 
                path="/exercise" 
                element={
                  <motion.div
                    key="exercise"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Exercise />
                  </motion.div>
                } 
              />
              <Route 
                path="/nurture" 
                element={
                  <motion.div
                    key="nurture"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <NurtureZone />
                  </motion.div>
                } 
              />
              <Route 
                path="/healing" 
                element={
                  <motion.div
                    key="healing"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <HealingCircle />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
