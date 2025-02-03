import React, { useState } from "react";

function ProfileForm({ addProfile }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    occupation: "",
  });

  const handleChange = (event) => {
    //console.log(event.target.value, event.target.name);
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    addProfile(formData);
  };
  return (
    <>
      <form
        className="profile-form container"
        action=""
        onSubmit={handleSubmit}
      >
        <h2>Profile Form</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          value={formData.age}
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          onChange={handleChange}
          value={formData.occupation}
        />
        <button type="submit">Add Profile</button>
      </form>
    </>
  );
}

export default ProfileForm;
