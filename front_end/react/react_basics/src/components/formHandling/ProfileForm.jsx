import React, { useState, useEffect } from "react";

function ProfileForm(props) {
  const { profile, isEditing = false, initialData = {} } = props;
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
    if (isEditing) {
      setFormData(initialData);
    }
  }, [initialData, isEditing]);

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    let errors = { fullname: "", age: "", occupation: "" };

    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!nameRegex.test(formData.fullname)) {
      valid = false;
      errors.fullname = "Invalid name";
    }

    if (formData.age < 18) {
      valid = false;
      errors.age = "Invalide Age";
    }

    if (!nameRegex.test(formData.occupation)) {
      valid = false;
      errors.occupation = "Invalid name";
    }

    setErrors(errors);

    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      profile(formData);
      setFormData({ fullname: "", age: "", occupation: "" });
      setErrors({ fullname: "", age: "", occupation: "" });
    }
  };

  return (
    <>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Edit Form" : "Profile Form"}</h2>

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
