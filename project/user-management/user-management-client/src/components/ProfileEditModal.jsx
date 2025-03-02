import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

Modal.setAppElement("#root");

const ModalContainer = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 5px 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  &:hover {
    background: ${(props) => (props.primary ? "#0056b3" : "#5a6268")};
  }
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  &:hover {
    background: darkred;
  }
`;

const LanguageContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #f9f9f9;
  position: relative;
`;

const ProfileEditModal = ({
  isOpen,
  closeModal,
  section,
  tempData,
  setTempData,
  handleSubmit,
}) => {
  const addLanguage = (e) => {
    e.preventDefault();
    setTempData([
      ...tempData,
      { name: "", read: false, write: false, speak: false },
    ]);
  };

  const removeLanguage = (index) => {
    setTempData(tempData.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedLanguages = [...tempData];
    updatedLanguages[index][field] = value;
    setTempData(updatedLanguages);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <ModalContainer>
        <h2>Edit {section}</h2>
        <form onSubmit={handleSubmit}>
          {section === "languages" ? (
            <>
              {console.log(tempData)}
              {tempData.map((lang, index) => (
                <LanguageContainer key={index}>
                  <Input
                    type="text"
                    placeholder="Language"
                    value={lang.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                  <CheckboxContainer>
                    {["Read", "Write", "Speak"].map((skill) => (
                      <CheckboxLabel key={skill}>
                        <input
                          type="checkbox"
                          checked={lang[skill.toLowerCase()]}
                          onChange={(e) =>
                            handleChange(
                              index,
                              skill.toLowerCase(),
                              e.target.checked
                            )
                          }
                        />
                        {skill}
                      </CheckboxLabel>
                    ))}
                  </CheckboxContainer>
                  <DeleteButton onClick={() => removeLanguage(index)}>
                    <FaTrash /> Remove
                  </DeleteButton>
                </LanguageContainer>
              ))}
              <Button onClick={addLanguage}>Add Language</Button>
            </>
          ) : (
            Object.keys(tempData).map((key) => (
              <div key={key}>
                <label>{key}:</label>
                <Input
                  type="text"
                  name={key}
                  value={tempData[key] || ""}
                  onChange={(e) =>
                    setTempData({ ...tempData, [key]: e.target.value })
                  }
                />
              </div>
            ))
          )}
          <Button primary type="submit">
            Save
          </Button>
          <Button type="button" onClick={closeModal}>
            Cancel
          </Button>
        </form>
      </ModalContainer>
    </Modal>
  );
};

export default ProfileEditModal;
