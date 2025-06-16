import React from 'react';
import { 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Box 
} from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg" className="text-center py-4">
      <Typography variant="h3" component="h1" gutterBottom>
        Voice Navigation System
      </Typography>
      
      <Typography 
        variant="body1" 
        className="mx-auto mb-4"
        sx={{ maxWidth: 600, color: '#7f8c8d' }}
      >
        Navigate through the application using just your voice. Say commands like "go to dashboard", 
        "show settings", or "open profile" to navigate without clicking.
      </Typography>
      
      <Grid container spacing={3} className="mt-3">
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            className="p-3 h-100"
            sx={{
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <Box className="mb-3" sx={{ fontSize: 36 }}>🎤</Box>
            <Typography variant="h6" component="h3" gutterBottom>
              Voice Commands
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Control the application using natural voice commands without touching your device.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            className="p-3 h-100"
            sx={{
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <Box className="mb-3" sx={{ fontSize: 36 }}>🔍</Box>
            <Typography variant="h6" component="h3" gutterBottom>
              Smart Recognition
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Advanced speech recognition that understands various command phrasings.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            className="p-3 h-100"
            sx={{
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <Box className="mb-3" sx={{ fontSize: 36 }}>⚡</Box>
            <Typography variant="h6" component="h3" gutterBottom>
              Fast Navigation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quickly jump between sections without navigating through menus.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            className="p-3 h-100"
            sx={{
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <Box className="mb-3" sx={{ fontSize: 36 }}>♿</Box>
            <Typography variant="h6" component="h3" gutterBottom>
              Accessibility
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Makes the application more accessible for users with mobility limitations.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;