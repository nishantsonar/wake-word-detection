// MIT License
// Copyright (c) 2025 Nishant Sonar
//
// Permission is hereby granted, free of charge, to any person obtaining a copy...
// (add rest of license if desired, or just the first two lines as attribution)

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import VoiceNavigation from './components/VoiceNavigation';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

// Voice navigation commands
const navigationCommands = [
  {
    keywords: ['go home', 'home page', 'main page'],
    action: '/',
    description: 'Navigate to Home page'
  },
  {
    keywords: ['dashboard', 'go to dashboard', 'show dashboard'],
    action: '/dashboard',
    description: 'Navigate to Dashboard'
  },
  {
    keywords: ['settings', 'go to settings', 'show settings', 'open settings'],
    action: '/settings',
    description: 'Navigate to Settings'
  },
  {
    keywords: ['profile', 'go to profile', 'show profile', 'open profile', 'my profile'],
    action: '/profile',
    description: 'Navigate to Profile'
  }
];

// Navigation wrapper component to use the navigate hook
const NavigationWrapper = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  const toggleVoiceRecognition = () => {
    setIsListening(!isListening);
  };
  
  return (
    <>
      <Navbar isListening={isListening} toggleVoiceRecognition={toggleVoiceRecognition} />
      
      <main className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </main>
      
      {/* Transparent voice navigation component for desktop */}
      <div className="position-fixed bottom-0 end-0 p-4 d-none d-md-block" style={{ zIndex: 1000 }}>
        <div className="bg-transparent">
          <VoiceNavigation 
            onNavigate={handleNavigation} 
            commands={navigationCommands}
            transparent={true}
          />
        </div>
      </div>
      
      {/* Mobile version of voice navigation - fixed at bottom center */}
      <div className="position-fixed bottom-0 start-50 translate-middle-x p-3 d-block d-md-none" style={{ zIndex: 1000 }}>
        <div className="bg-transparent rounded-pill shadow-sm p-2">
          <button 
            className={`btn ${isListening ? 'btn-danger' : 'btn-success'} rounded-circle`}
            onClick={toggleVoiceRecognition}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            <i className={`bi ${isListening ? 'bi-mic-mute' : 'bi-mic'}`}></i>
          </button>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <NavigationWrapper />
      </div>
    </Router>
  );
}

export default App;