import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Navbar from './components/Navbar';
import VoiceNavigationWithWakeWord from './components/VoiceNavigationWithWakeWord';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const VoiceControlContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
`;

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
      
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainContent>
      
      <VoiceControlContainer>
        <VoiceNavigationWithWakeWord 
          onNavigate={handleNavigation} 
          commands={navigationCommands}
        />
      </VoiceControlContainer>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContainer>
        <NavigationWrapper />
      </AppContainer>
    </Router>
  );
}

export default App;