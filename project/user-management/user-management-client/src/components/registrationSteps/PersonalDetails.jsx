import React from "react";
import styled from "styled-components";

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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  &:hover {
    background: #0056b3;
  }
`;

const PersonalDetails = ({ formData, setFormData, nextStep }) => {
  return (
    <Container>
      <Title>Step 1: Personal Details</Title>
      <label>
        Name
        <Input
          type="text"
          placeholder="Enter your name"
          value={formData.personal.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, name: e.target.value },
            })
          }
          required
        />
      </label>

      <label>
        Email
        <Input
          type="email"
          placeholder="Enter your email"
          value={formData.personal.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, email: e.target.value },
            })
          }
          required
        />
      </label>

      <label>
        Phone
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={formData.personal.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, phone: e.target.value },
            })
          }
          required
        />
      </label>

      <label>
        Date of Birth
        <Input
          type="date"
          value={formData.personal.dob}
          onChange={(e) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, dob: e.target.value },
            })
          }
          required
        />
      </label>

      <label>
        Gender
        <Select
          value={formData.personal.gender}
          onChange={(e) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, gender: e.target.value },
            })
          }
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
      </label>

      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </Container>
  );
};

export default PersonalDetails;
