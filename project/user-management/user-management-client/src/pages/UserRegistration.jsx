import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import PersonalDetails from "../components/registrationSteps/PersonalDetails";
import AddressDetails from "../components/registrationSteps/AddressDetails";
import LanguageDetails from "../components/registrationSteps/LanguageDetails";
import Credentials from "../components/registrationSteps/Credentials";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
  background-color: #f4f4f4;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const UserRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
    },
    permanent: {
      doorno: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pin: "",
    },
    current: {
      doorno: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pin: "",
    },
    sameAsPermanent: false,
    languages: [{ name: "", read: false, write: false, speak: false }],
    credentials: {
      username: "",
      password: "",
    },
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/register", formData);

      navigate("/login");

      //alert("Registration Successful");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Container>
      <Card>
        {step === 1 && (
          <PersonalDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <AddressDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <LanguageDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 4 && (
          <Credentials
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </Card>
    </Container>
  );
};

export default UserRegistration;
