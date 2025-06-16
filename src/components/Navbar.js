import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #2c3e50;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.span`
  margin-right: 10px;
  font-size: 28px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? '#3498db' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const MicButton = styled.button`
  background-color: ${props => props.active ? '#e74c3c' : '#3498db'};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Navbar = ({ isListening, toggleVoiceRecognition }) => {
  const location = useLocation();
  
  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">
          <LogoIcon>🎤</LogoIcon>
          VoiceNav
        </Logo>
        
        <NavLinks>
          <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
            Home
          </NavLink>
          <NavLink to="/dashboard" active={location.pathname === '/dashboard' ? 1 : 0}>
            Dashboard
          </NavLink>
          <NavLink to="/settings" active={location.pathname === '/settings' ? 1 : 0}>
            Settings
          </NavLink>
          <NavLink to="/profile" active={location.pathname === '/profile' ? 1 : 0}>
            Profile
          </NavLink>
          
          <MicButton 
            active={isListening ? 1 : 0}
            onClick={toggleVoiceRecognition}
            aria-label={isListening ? "Stop voice recognition" : "Start voice recognition"}
          >
            {isListening ? '⏹' : '🎤'}
          </MicButton>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;