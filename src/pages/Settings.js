import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  FormControl, 
  FormControlLabel, 
  Switch, 
  Select, 
  MenuItem, 
  InputLabel, 
  Button, 
  FormHelperText,
  Divider
} from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    voiceEnabled: true,
    continuousListening: false,
    language: 'en-US',
    sensitivity: 'medium',
    notifications: true
  });
  
  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };
  
  const handleChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" color="text.primary" gutterBottom>
          Settings
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Configure your voice navigation preferences
        </Typography>
      </Box>
      
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
          Voice Recognition
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Enable Voice Navigation
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Turn on/off voice command recognition throughout the application
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.voiceEnabled}
                onChange={() => handleToggle('voiceEnabled')}
                color="success"
              />
            }
            label={
              <Typography color={settings.voiceEnabled ? 'success.main' : 'text.secondary'} fontWeight={500}>
                {settings.voiceEnabled ? 'Enabled' : 'Disabled'}
              </Typography>
            }
          />
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Continuous Listening
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Keep microphone active and listen for commands without requiring button press
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.continuousListening}
                onChange={() => handleToggle('continuousListening')}
                color="success"
              />
            }
            label={
              <Typography color={settings.continuousListening ? 'success.main' : 'text.secondary'} fontWeight={500}>
                {settings.continuousListening ? 'Enabled' : 'Disabled'}
              </Typography>
            }
          />
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Recognition Language
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Select the language for voice command recognition
          </Typography>
          <FormControl sx={{ maxWidth: 300, width: '100%' }}>
            <Select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              displayEmpty
              size="small"
            >
              <MenuItem value="en-US">English (US)</MenuItem>
              <MenuItem value="en-GB">English (UK)</MenuItem>
              <MenuItem value="es-ES">Spanish</MenuItem>
              <MenuItem value="fr-FR">French</MenuItem>
              <MenuItem value="de-DE">German</MenuItem>
              <MenuItem value="ja-JP">Japanese</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Microphone Sensitivity
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Adjust how sensitive the microphone is to your voice
          </Typography>
          <FormControl sx={{ maxWidth: 300, width: '100%' }}>
            <Select
              value={settings.sensitivity}
              onChange={(e) => handleChange('sensitivity', e.target.value)}
              displayEmpty
              size="small"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          Notifications
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Voice Command Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Show notifications when voice commands are recognized
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
                color="success"
              />
            }
            label={
              <Typography color={settings.notifications ? 'success.main' : 'text.secondary'} fontWeight={500}>
                {settings.notifications ? 'Enabled' : 'Disabled'}
              </Typography>
            }
          />
        </Box>
      </Paper>
      
      <Button 
        variant="contained" 
        sx={{ 
          bgcolor: '#3498db', 
          '&:hover': { bgcolor: '#2980b9' },
          mt: 2
        }}
      >
        Save Settings
      </Button>
    </Container>
  );
};

export default Settings;