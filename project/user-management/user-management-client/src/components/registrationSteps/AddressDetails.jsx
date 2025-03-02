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

const Fieldset = styled.fieldset`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
`;

const Legend = styled.legend`
  font-weight: bold;
  color: #007bff;
  padding: 0 10px;
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  margin-top: 10px;
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

const AddressDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <>
      <Title>Step 2: Address Details</Title>

      <Fieldset>
        <Legend>Permanent Address</Legend>
        <Input
          type="text"
          placeholder="Door No"
          value={formData.permanent.doorno}
          onChange={(e) =>
            setFormData({
              ...formData,
              permanent: { ...formData.permanent, doorno: e.target.value },
            })
          }
        />
        <Input
          type="text"
          placeholder="Street"
          value={formData.permanent.street}
          onChange={(e) =>
            setFormData({
              ...formData,
              permanent: { ...formData.permanent, street: e.target.value },
            })
          }
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.permanent.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              permanent: { ...formData.permanent, city: e.target.value },
            })
          }
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.permanent.state}
          onChange={(e) =>
            setFormData({
              ...formData,
              permanent: { ...formData.permanent, state: e.target.value },
            })
          }
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.permanent.country}
          onChange={(e) =>
            setFormData({
              ...formData,
              permanent: { ...formData.permanent, country: e.target.value },
            })
          }
        />
        <Input
          type="text"
          placeholder="PIN Code"
          value={formData.permanent.pin}
          onChange={(e) =>
            setFormData({
              ...formData,
              permanent: { ...formData.permanent, pin: e.target.value },
            })
          }
        />
      </Fieldset>

      <Fieldset>
        <Legend>Current Address</Legend>
        <Input
          type="text"
          placeholder="Door No"
          value={formData.current.doorno}
          onChange={(e) =>
            setFormData({
              ...formData,
              current: { ...formData.current, doorno: e.target.value },
            })
          }
          disabled={formData.sameAsPermanent}
        />
        <Input
          type="text"
          placeholder="Street"
          value={formData.current.street}
          onChange={(e) =>
            setFormData({
              ...formData,
              current: { ...formData.current, street: e.target.value },
            })
          }
          disabled={formData.sameAsPermanent}
        />
        <Input
          type="text"
          placeholder="City"
          value={formData.current.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              current: { ...formData.current, city: e.target.value },
            })
          }
          disabled={formData.sameAsPermanent}
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.current.state}
          onChange={(e) =>
            setFormData({
              ...formData,
              current: { ...formData.current, state: e.target.value },
            })
          }
          disabled={formData.sameAsPermanent}
        />
        <Input
          type="text"
          placeholder="Country"
          value={formData.current.country}
          onChange={(e) =>
            setFormData({
              ...formData,
              current: { ...formData.current, country: e.target.value },
            })
          }
          disabled={formData.sameAsPermanent}
        />
        <Input
          type="text"
          placeholder="PIN Code"
          value={formData.current.pin}
          onChange={(e) =>
            setFormData({
              ...formData,
              current: { ...formData.current, pin: e.target.value },
            })
          }
          disabled={formData.sameAsPermanent}
        />
      </Fieldset>

      <CheckboxLabel>
        <input
          type="checkbox"
          checked={formData.sameAsPermanent}
          onChange={(e) =>
            setFormData({
              ...formData,
              sameAsPermanent: e.target.checked,
              current: e.target.checked ? { ...formData.permanent } : {},
            })
          }
        />
        <span>Same as Permanent Address</span>
      </CheckboxLabel>

      <ButtonContainer>
        <Button onClick={prevStep}>Back</Button>
        <Button primary onClick={nextStep}>
          Next
        </Button>
      </ButtonContainer>
    </>
  );
};

export default AddressDetails;
