import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

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
  const { state } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // ✅ Fetch user details from Spring Boot API
        const response = await axios.get(
          "http://localhost:8080/api/users/check-auth",
          { withCredentials: true } // 🔹 Send cookies with request
        );

        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to load user data. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <Container>Loading user details...</Container>;
  if (error) return <Container>{error}</Container>;
  if (!userDetails) return <Container>User not found.</Container>;

  return (
    <Container>
      <Title>Welcome, {userDetails.personal.name || "User"}!</Title>
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
