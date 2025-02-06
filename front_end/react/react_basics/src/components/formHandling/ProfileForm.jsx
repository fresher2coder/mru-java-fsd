import React, { useState, useEffect } from "react";

function ProfileForm(props) {
  const { addProfile } = props;
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    occupation: "",
  });

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addProfile(formData);
    setFormData({ fullname: "", age: "", occupation: "" });
  };

  return (
    <>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>"Profile Form"</h2>

        <input
          type="text"
          placeholder="FullName"
          name="fullname"
          value={formData.fullname}
          required
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Age"
          name="age"
          value={formData.age}
          required
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Occupation"
          name="occupation"
          value={formData.occupation}
          required
          onChange={handleChange}
        />

        <button type="submit">"Create Profile"</button>
      </form>
    </>
  );
}

export default ProfileForm;
