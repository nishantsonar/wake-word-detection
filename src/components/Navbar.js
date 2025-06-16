import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  IconButton, 
  Container 
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const Navbar = ({ isListening, toggleVoiceRecognition }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              mr: 2
            }}
          >
            <Box component="span" sx={{ mr: 1, fontSize: '28px' }}>🎤</Box>
            VoiceNav
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: isActive('/') ? '#3498db' : 'rgba(255, 255, 255, 0.8)',
                mx: 0.5,
                fontWeight: isActive('/') ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }
              }}
            >
              Home
            </Button>
            
            <Button
              component={Link}
              to="/dashboard"
              sx={{
                color: isActive('/dashboard') ? '#3498db' : 'rgba(255, 255, 255, 0.8)',
                mx: 0.5,
                fontWeight: isActive('/dashboard') ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }
              }}
            >
              Dashboard
            </Button>
            
            <Button
              component={Link}
              to="/settings"
              sx={{
                color: isActive('/settings') ? '#3498db' : 'rgba(255, 255, 255, 0.8)',
                mx: 0.5,
                fontWeight: isActive('/settings') ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }
              }}
            >
              Settings
            </Button>
            
            <Button
              component={Link}
              to="/profile"
              sx={{
                color: isActive('/profile') ? '#3498db' : 'rgba(255, 255, 255, 0.8)',
                mx: 0.5,
                fontWeight: isActive('/profile') ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }
              }}
            >
              Profile
            </Button>
          </Box>
          
          <IconButton
            onClick={toggleVoiceRecognition}
            aria-label={isListening ? "Stop voice recognition" : "Start voice recognition"}
            sx={{
              backgroundColor: isListening ? '#e74c3c' : '#3498db',
              color: 'white',
              width: 40,
              height: 40,
              ml: 1.5,
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: isListening ? '#c0392b' : '#2980b9'
              }
            }}
          >
            {isListening ? <StopIcon /> : <MicIcon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;