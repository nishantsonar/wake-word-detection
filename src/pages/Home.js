import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #7f8c8d;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1000px;
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 36px;
  margin-bottom: 15px;
`;

const FeatureTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Voice Navigation System</Title>
      <Description>
        Navigate through the application using just your voice. Say commands like "go to dashboard", 
        "show settings", or "open profile" to navigate without clicking.
      </Description>
      
      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>🎤</FeatureIcon>
          <FeatureTitle>Voice Commands</FeatureTitle>
          <FeatureDescription>
            Control the application using natural voice commands without touching your device.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🔍</FeatureIcon>
          <FeatureTitle>Smart Recognition</FeatureTitle>
          <FeatureDescription>
            Advanced speech recognition that understands various command phrasings.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>⚡</FeatureIcon>
          <FeatureTitle>Fast Navigation</FeatureTitle>
          <FeatureDescription>
            Quickly jump between sections without navigating through menus.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>♿</FeatureIcon>
          <FeatureTitle>Accessibility</FeatureTitle>
          <FeatureDescription>
            Makes the application more accessible for users with mobility limitations.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>
    </HomeContainer>
  );
};

export default Home;