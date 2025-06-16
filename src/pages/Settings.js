import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
`;

const SettingsSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ecf0f1;
`;

const SettingItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const SettingLabel = styled.label`
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 500;
`;

const SettingDescription = styled.p`
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 10px;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 10px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #2ecc71;
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const ToggleStatus = styled.span`
  color: ${props => props.active ? '#2ecc71' : '#7f8c8d'};
  font-weight: 500;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 20px;
  
  &:hover {
    background-color: #2980b9;
  }
`;

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
    <SettingsContainer>
      <Header>
        <Title>Settings</Title>
        <Subtitle>Configure your voice navigation preferences</Subtitle>
      </Header>
      
      <SettingsSection>
        <SectionTitle>Voice Recognition</SectionTitle>
        
        <SettingItem>
          <SettingLabel>Enable Voice Navigation</SettingLabel>
          <SettingDescription>
            Turn on/off voice command recognition throughout the application
          </SettingDescription>
          <ToggleContainer>
            <ToggleSwitch>
              <ToggleInput 
                type="checkbox" 
                checked={settings.voiceEnabled}
                onChange={() => handleToggle('voiceEnabled')}
              />
              <ToggleSlider />
            </ToggleSwitch>
            <ToggleStatus active={settings.voiceEnabled}>
              {settings.voiceEnabled ? 'Enabled' : 'Disabled'}
            </ToggleStatus>
          </ToggleContainer>
        </SettingItem>
        
        <SettingItem>
          <SettingLabel>Continuous Listening</SettingLabel>
          <SettingDescription>
            Keep microphone active and listen for commands without requiring button press
          </SettingDescription>
          <ToggleContainer>
            <ToggleSwitch>
              <ToggleInput 
                type="checkbox" 
                checked={settings.continuousListening}
                onChange={() => handleToggle('continuousListening')}
              />
              <ToggleSlider />
            </ToggleSwitch>
            <ToggleStatus active={settings.continuousListening}>
              {settings.continuousListening ? 'Enabled' : 'Disabled'}
            </ToggleStatus>
          </ToggleContainer>
        </SettingItem>
        
        <SettingItem>
          <SettingLabel>Recognition Language</SettingLabel>
          <SettingDescription>
            Select the language for voice command recognition
          </SettingDescription>
          <Select 
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
            <option value="ja-JP">Japanese</option>
          </Select>
        </SettingItem>
        
        <SettingItem>
          <SettingLabel>Microphone Sensitivity</SettingLabel>
          <SettingDescription>
            Adjust how sensitive the microphone is to your voice
          </SettingDescription>
          <Select 
            value={settings.sensitivity}
            onChange={(e) => handleChange('sensitivity', e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </SettingItem>
      </SettingsSection>
      
      <SettingsSection>
        <SectionTitle>Notifications</SectionTitle>
        
        <SettingItem>
          <SettingLabel>Voice Command Notifications</SettingLabel>
          <SettingDescription>
            Show notifications when voice commands are recognized
          </SettingDescription>
          <ToggleContainer>
            <ToggleSwitch>
              <ToggleInput 
                type="checkbox" 
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
              <ToggleSlider />
            </ToggleSwitch>
            <ToggleStatus active={settings.notifications}>
              {settings.notifications ? 'Enabled' : 'Disabled'}
            </ToggleStatus>
          </ToggleContainer>
        </SettingItem>
      </SettingsSection>
      
      <Button>Save Settings</Button>
    </SettingsContainer>
  );
};

export default Settings;