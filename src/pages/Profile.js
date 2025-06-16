import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  margin-right: 30px;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  color: #2c3e50;
  margin-bottom: 5px;
`;

const ProfileTitle = styled.p`
  color: #7f8c8d;
  margin-bottom: 10px;
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
`;

const StatIcon = styled.span`
  margin-right: 5px;
`;

const StatText = styled.span`
  color: #7f8c8d;
`;

const ProfileSection = styled.div`
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
`;

const InfoLabel = styled.div`
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 5px;
`;

const InfoValue = styled.div`
  color: #2c3e50;
  font-weight: 500;
`;

const ActivityList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ActivityItem = styled.li`
  padding: 15px 0;
  border-bottom: 1px solid #ecf0f1;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ActivityTitle = styled.div`
  color: #2c3e50;
  font-weight: 500;
`;

const ActivityDate = styled.div`
  color: #7f8c8d;
  font-size: 14px;
`;

const ActivityDescription = styled.div`
  color: #7f8c8d;
`;

const EditButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage>JD</ProfileImage>
        <ProfileInfo>
          <ProfileName>John Doe</ProfileName>
          <ProfileTitle>Voice Navigation Enthusiast</ProfileTitle>
          <ProfileStats>
            <StatItem>
              <StatIcon>🎤</StatIcon>
              <StatText>42 Voice Commands Used</StatText>
            </StatItem>
            <StatItem>
              <StatIcon>📅</StatIcon>
              <StatText>Member since Jan 2023</StatText>
            </StatItem>
          </ProfileStats>
        </ProfileInfo>
        <EditButton>Edit Profile</EditButton>
      </ProfileHeader>
      
      <ProfileSection>
        <SectionTitle>Personal Information</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Full Name</InfoLabel>
            <InfoValue>John Doe</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>john.doe@example.com</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Phone</InfoLabel>
            <InfoValue>+1 (555) 123-4567</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Location</InfoLabel>
            <InfoValue>San Francisco, CA</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Preferred Language</InfoLabel>
            <InfoValue>English (US)</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Account Type</InfoLabel>
            <InfoValue>Premium</InfoValue>
          </InfoItem>
        </InfoGrid>
      </ProfileSection>
      
      <ProfileSection>
        <SectionTitle>Voice Command History</SectionTitle>
        <ActivityList>
          <ActivityItem>
            <ActivityHeader>
              <ActivityTitle>Used "Go to Dashboard" command</ActivityTitle>
              <ActivityDate>Today, 2:30 PM</ActivityDate>
            </ActivityHeader>
            <ActivityDescription>
              Successfully navigated to Dashboard page
            </ActivityDescription>
          </ActivityItem>
          <ActivityItem>
            <ActivityHeader>
              <ActivityTitle>Used "Show Settings" command</ActivityTitle>
              <ActivityDate>Today, 11:15 AM</ActivityDate>
            </ActivityHeader>
            <ActivityDescription>
              Successfully navigated to Settings page
            </ActivityDescription>
          </ActivityItem>
          <ActivityItem>
            <ActivityHeader>
              <ActivityTitle>Used "Open Profile" command</ActivityTitle>
              <ActivityDate>Yesterday, 4:45 PM</ActivityDate>
            </ActivityHeader>
            <ActivityDescription>
              Successfully navigated to Profile page
            </ActivityDescription>
          </ActivityItem>
          <ActivityItem>
            <ActivityHeader>
              <ActivityTitle>Used "Go Home" command</ActivityTitle>
              <ActivityDate>Yesterday, 2:10 PM</ActivityDate>
            </ActivityHeader>
            <ActivityDescription>
              Successfully navigated to Home page
            </ActivityDescription>
          </ActivityItem>
        </ActivityList>
      </ProfileSection>
    </ProfileContainer>
  );
};

export default Profile;