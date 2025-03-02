import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Container = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #4a4a4a;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ToggleIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: ${(props) => (props.primary ? "#0056b3" : "#5a6268")};
  }
`;

const Credentials = ({ formData, setFormData, prevStep, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Container>
      <Title>Step 4: Credentials</Title>

      <InputContainer>
        <Input
          type="text"
          placeholder="Username"
          value={formData.credentials.username}
          onChange={(e) =>
            setFormData({
              ...formData,
              credentials: {
                ...formData.credentials,
                username: e.target.value,
              },
            })
          }
          required
        />
      </InputContainer>

      <InputContainer>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.credentials.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              credentials: {
                ...formData.credentials,
                password: e.target.value,
              },
            })
          }
          required
        />
        <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </ToggleIcon>
      </InputContainer>

      <InputContainer>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={formData.credentials.confirmPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              credentials: {
                ...formData.credentials,
                confirmPassword: e.target.value,
              },
            })
          }
          required
        />
        <ToggleIcon
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </ToggleIcon>
      </InputContainer>

      <ButtonContainer>
        <Button onClick={prevStep}>Back</Button>
        <Button primary onClick={handleSubmit}>
          Submit
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Credentials;
