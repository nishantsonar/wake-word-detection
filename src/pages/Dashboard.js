import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider 
} from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" color="text.primary" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome to your voice navigation dashboard
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              borderRadius: 2
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3498db', mb: 1 }}>
              42
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Voice Commands Used
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              borderRadius: 2
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3498db', mb: 1 }}>
              89%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Recognition Accuracy
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              borderRadius: 2
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3498db', mb: 1 }}>
              12
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Custom Commands
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              borderRadius: 2
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3498db', mb: 1 }}>
              5.2s
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Average Response Time
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          height: 300, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: 2
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body1">Voice Command Usage Chart</Typography>
          <Typography variant="body2">(Visualization would be implemented here)</Typography>
        </Box>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" color="text.primary" sx={{ mb: 3, pb: 1, borderBottom: '1px solid #ecf0f1' }}>
          Recent Activity
        </Typography>
        
        <List>
          <ListItem sx={{ py: 2, borderBottom: '1px solid #ecf0f1' }}>
            <ListItemIcon>
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  bgcolor: '#3498db', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                🎤
              </Box>
            </ListItemIcon>
            <ListItemText 
              primary="Voice command 'go to settings' recognized" 
              secondary="Today, 2:30 PM" 
              primaryTypographyProps={{ color: 'text.primary' }}
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
          </ListItem>
          
          <ListItem sx={{ py: 2, borderBottom: '1px solid #ecf0f1' }}>
            <ListItemIcon>
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  bgcolor: '#3498db', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                ⚙️
              </Box>
            </ListItemIcon>
            <ListItemText 
              primary="Added new custom command 'show analytics'" 
              secondary="Today, 11:15 AM" 
              primaryTypographyProps={{ color: 'text.primary' }}
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
          </ListItem>
          
          <ListItem sx={{ py: 2, borderBottom: '1px solid #ecf0f1' }}>
            <ListItemIcon>
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  bgcolor: '#3498db', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                🔄
              </Box>
            </ListItemIcon>
            <ListItemText 
              primary="Updated voice recognition settings" 
              secondary="Yesterday, 4:45 PM" 
              primaryTypographyProps={{ color: 'text.primary' }}
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
          </ListItem>
          
          <ListItem sx={{ py: 2 }}>
            <ListItemIcon>
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  bgcolor: '#3498db', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                🎤
              </Box>
            </ListItemIcon>
            <ListItemText 
              primary="Voice command 'open profile' recognized" 
              secondary="Yesterday, 2:10 PM" 
              primaryTypographyProps={{ color: 'text.primary' }}
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Dashboard;