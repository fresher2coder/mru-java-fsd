import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext"; // Replace with your AuthContext path

const Container = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: rgb(255, 247, 177);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Title = styled.h1`
  color: rgb(158, 143, 0);
  margin-bottom: 20px;
  font-size: 2rem;
`;

const Features = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const FeatureCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

function Dashboard() {
  const { state } = useAuth(); // Access the state from AuthContext
  const user = state.user;

  return (
    <Container>
      <Title>Welcome, {user?.personal.name || "User"}!</Title>
      <p>Here are the features available for you:</p>
      <Features>
        <FeatureCard>
          <h3>Edit Profile</h3>
        </FeatureCard>
        <FeatureCard>
          <h3>Manage Account</h3>
        </FeatureCard>
        <FeatureCard>
          <h3>View Activity</h3>
        </FeatureCard>
        <FeatureCard>
          <h3>Change Password</h3>
        </FeatureCard>
      </Features>
    </Container>
  );
}

export default Dashboard;
