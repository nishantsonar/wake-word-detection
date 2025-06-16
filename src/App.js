import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import VoiceNavigationWithWakeWord from './components/VoiceNavigationWithWakeWord';

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
      
      <Container component="main" className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
      
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 100
        }}
      >
        <VoiceNavigationWithWakeWord 
          onNavigate={handleNavigation} 
          commands={navigationCommands}
        />
      </Box>
    </>
  );
};

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
        <NavigationWrapper />
      </Box>
    </Router>
  );
}

export default App;