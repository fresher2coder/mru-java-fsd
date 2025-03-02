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

const LanguageContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #f9f9f9;
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

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
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

const LanguageDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  const addLanguage = () => {
    const existingLanguages = formData.languages.map((lang) =>
      lang.name.toLowerCase()
    );
    if (!existingLanguages.includes("")) {
      setFormData({
        ...formData,
        languages: [
          ...formData.languages,
          { name: "", read: false, write: false, speak: false },
        ],
      });
    }
  };

  const removeLanguage = (index) => {
    if (formData.languages.length > 1) {
      setFormData({
        ...formData,
        languages: formData.languages.filter((_, i) => i !== index),
      });
    }
  };

  const handleChange = (index, field, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index][field] = value;
    if (field === "name") {
      const lowerCaseNames = newLanguages.map((lang) =>
        lang.name.toLowerCase()
      );
      if (
        lowerCaseNames.filter((name) => name === value.toLowerCase()).length > 1
      ) {
        alert("This language is already added!");
        return;
      }
    }
    setFormData({ ...formData, languages: newLanguages });
  };

  return (
    <>
      <Title>Step 3: Languages Known</Title>
      {formData.languages.map((lang, index) => (
        <LanguageContainer key={index}>
          <Input
            type="text"
            placeholder="Language"
            value={lang.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <CheckboxContainer>
            {["Read", "Write", "Speak"].map((skill) => (
              <CheckboxLabel key={skill}>
                <input
                  type="checkbox"
                  checked={lang[skill.toLowerCase()]}
                  onChange={(e) =>
                    handleChange(index, skill.toLowerCase(), e.target.checked)
                  }
                />
                <span>{skill}</span>
              </CheckboxLabel>
            ))}
          </CheckboxContainer>
          {formData.languages.length > 1 && (
            <Button onClick={() => removeLanguage(index)}>Remove</Button>
          )}
        </LanguageContainer>
      ))}
      <Button onClick={addLanguage}>Add Language</Button>
      <ButtonContainer>
        <Button onClick={prevStep}>Back</Button>
        <Button primary onClick={nextStep}>
          Next
        </Button>
      </ButtonContainer>
    </>
  );
};

export default LanguageDetails;
