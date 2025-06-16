import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 14px;
`;

const ChartContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartPlaceholder = styled.div`
  color: #7f8c8d;
  text-align: center;
`;

const RecentActivityContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ActivityTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const ActivityList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ActivityItem = styled.li`
  padding: 15px 0;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  color: #2c3e50;
  margin-bottom: 5px;
`;

const ActivityTime = styled.div`
  color: #7f8c8d;
  font-size: 12px;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard</Title>
        <Subtitle>Welcome to your voice navigation dashboard</Subtitle>
      </Header>
      
      <StatsGrid>
        <StatCard>
          <StatValue>42</StatValue>
          <StatLabel>Voice Commands Used</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>89%</StatValue>
          <StatLabel>Recognition Accuracy</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>12</StatValue>
          <StatLabel>Custom Commands</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>5.2s</StatValue>
          <StatLabel>Average Response Time</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <ChartContainer>
        <ChartPlaceholder>
          <p>Voice Command Usage Chart</p>
          <p>(Visualization would be implemented here)</p>
        </ChartPlaceholder>
      </ChartContainer>
      
      <RecentActivityContainer>
        <ActivityTitle>Recent Activity</ActivityTitle>
        <ActivityList>
          <ActivityItem>
            <ActivityIcon>🎤</ActivityIcon>
            <ActivityContent>
              <ActivityText>Voice command "go to settings" recognized</ActivityText>
              <ActivityTime>Today, 2:30 PM</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityIcon>⚙️</ActivityIcon>
            <ActivityContent>
              <ActivityText>Added new custom command "show analytics"</ActivityText>
              <ActivityTime>Today, 11:15 AM</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityIcon>🔄</ActivityIcon>
            <ActivityContent>
              <ActivityText>Updated voice recognition settings</ActivityText>
              <ActivityTime>Yesterday, 4:45 PM</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityIcon>🎤</ActivityIcon>
            <ActivityContent>
              <ActivityText>Voice command "open profile" recognized</ActivityText>
              <ActivityTime>Yesterday, 2:10 PM</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        </ActivityList>
      </RecentActivityContainer>
    </DashboardContainer>
  );
};

export default Dashboard;