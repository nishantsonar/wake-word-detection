// MIT License
// Copyright (c) 2025 Nishant Sonar
//
// Permission is hereby granted, free of charge, to any person obtaining a copy...
// (add rest of license if desired, or just the first two lines as attribution)

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button, 
  List, 
  ListItem, 
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center'
        }}
      >
        <Box 
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: '#3498db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px',
            mr: isMobile ? 0 : 3,
            mb: isMobile ? 2 : 0
          }}
        >
          JD
        </Box>
        
        <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
          <Typography variant="h4" component="h1" color="text.primary" gutterBottom>
            John Doe
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Voice Navigation Enthusiast
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ mr: 0.5 }}>🎤</Box>
              <Typography variant="body2" color="text.secondary">
                42 Voice Commands Used
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ mr: 0.5 }}>📅</Box>
              <Typography variant="body2" color="text.secondary">
                Member since Jan 2023
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#3498db', 
            '&:hover': { bgcolor: '#2980b9' },
            mt: isMobile ? 2 : 0
          }}
        >
          Edit Profile
        </Button>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          color="text.primary" 
          sx={{ 
            mb: 3, 
            pb: 1, 
            borderBottom: '1px solid #ecf0f1' 
          }}
        >
          Personal Information
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Full Name
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                John Doe
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                john.doe@example.com
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                +1 (555) 123-4567
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Location
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                San Francisco, CA
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Preferred Language
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                English (US)
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Account Type
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                Premium
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          color="text.primary" 
          sx={{ 
            mb: 3, 
            pb: 1, 
            borderBottom: '1px solid #ecf0f1' 
          }}
        >
          Voice Command History
        </Typography>
        
        <List>
          <ListItem sx={{ px: 0, py: 2, display: 'block', borderBottom: '1px solid #ecf0f1' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body1" fontWeight={500} color="text.primary">
                Used "Go to Dashboard" command
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Today, 2:30 PM
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Successfully navigated to Dashboard page
            </Typography>
          </ListItem>
          
          <ListItem sx={{ px: 0, py: 2, display: 'block', borderBottom: '1px solid #ecf0f1' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body1" fontWeight={500} color="text.primary">
                Used "Show Settings" command
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Today, 11:15 AM
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Successfully navigated to Settings page
            </Typography>
          </ListItem>
          
          <ListItem sx={{ px: 0, py: 2, display: 'block', borderBottom: '1px solid #ecf0f1' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body1" fontWeight={500} color="text.primary">
                Used "Open Profile" command
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yesterday, 4:45 PM
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Successfully navigated to Profile page
            </Typography>
          </ListItem>
          
          <ListItem sx={{ px: 0, py: 2, display: 'block' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body1" fontWeight={500} color="text.primary">
                Used "Go Home" command
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yesterday, 2:10 PM
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Successfully navigated to Home page
            </Typography>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Profile;