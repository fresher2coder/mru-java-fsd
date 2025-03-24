import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: rgb(255, 247, 177);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  input {
    width: 100%;
  }

  .icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 15px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const LoginComponent = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        formData,
        { withCredentials: true } // Allow cookies to be sent
      );

      console.log(response.data.username);

      login(response.data.username); // ✅ Store user state
      navigate("/dashboard"); // ✅ Redirect to dashboard
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid credentials");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <Container>
      <form onSubmit={handleLogin}>
        <Field>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </Field>

        <Field>
          <Label>Password:</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <div
              className="icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </PasswordContainer>
        </Field>

        {error && <Error>{error}</Error>}

        <Button type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default LoginComponent;
