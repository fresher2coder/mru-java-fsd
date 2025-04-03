import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.success ? "green" : "red")};
  font-weight: bold;
`;

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState({ text: "", success: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!formData.username || !formData.password) {
      setMessage({ text: "All fields are required", success: false });
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/register", formData);
      setMessage({ text: "Registration Successful", success: true });

      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Error during registration",
        success: false,
      });
      console.error("Error submitting form", error);
    }
  };

  return (
    <RegisterContainer>
      <h2>Register</h2>
      {message.text && (
        <Message success={message.success}>{message.text}</Message>
      )}
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button onClick={handleRegister}>Register</Button>
    </RegisterContainer>
  );
};

export default Register;
