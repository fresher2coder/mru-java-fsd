import React, { useState, useEffect } from "react";
import { validate } from "uuid";

function ProfileForm(props) {
  const { profile, initialData = {}, isEditing = false } = props;
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    occupation: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    age: "",
    occupation: "",
  });

  useEffect(() => {
    if (isEditing) setFormData(initialData);
  }, [initialData, isEditing]);

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    let validateErrors = { fullname: "", age: "", occupation: "" };

    const fullNameRegex = /^[A-Za-z]+(?:[A-Za-z]+)*$/;

    if (!fullNameRegex.test(formData.fullname)) {
      valid = false;
      validateErrors.fullname = "Invalid name format";
    }

    //age, occupation

    setErrors(validateErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      profile(formData);
      setFormData({ fullname: "", age: "", occupation: "" });
      setErrors({
        fullname: "",
        age: "",
        occupation: "",
      });
    }
  };

  return (
    <>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Update Profile" : "Create Profile"}</h2>

        <input
          type="text"
          placeholder="FullName"
          name="fullname"
          value={formData.fullname}
          required
          onChange={handleChange}
        />

        {errors.fullname && <span className="error">{errors.fullname}</span>}

        <input
          type="number"
          placeholder="Age"
          name="age"
          value={formData.age}
          required
          onChange={handleChange}
        />

        {errors.age && <span className="error">{errors.age}</span>}

        <input
          type="text"
          placeholder="Occupation"
          name="occupation"
          value={formData.occupation}
          required
          onChange={handleChange}
        />

        {errors.occupation && (
          <span className="error">{errors.occupation}</span>
        )}

        <button type="submit">
          {isEditing ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </>
  );
}

export default ProfileForm;
