import React, { useState, useEffect } from "react";
import { validate } from "uuid";

function ProfileForm(props) {
<<<<<<< HEAD
<<<<<<< HEAD
  const { profile, initialData = {}, isEditing = false } = props;
=======
  const { addProfile, initialData = {}, isEditing = false } = props;
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
  const { addProfile, initialData = {}, isEditing = false } = props;
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
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
<<<<<<< HEAD

  const [errors, setErrors] = useState({
    fullname: "",
    age: "",
    occupation: "",
  });

  useEffect(() => {
    if (isEditing) setFormData(initialData);
  }, [initialData, isEditing]);
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    let valid = true;
<<<<<<< HEAD
<<<<<<< HEAD
    let validateErrors = { fullname: "", age: "", occupation: "" };

    const fullNameRegex = /^[A-Za-z]+(?:[A-Za-z]+)*$/;

    if (!fullNameRegex.test(formData.fullname)) {
      valid = false;
      validateErrors.fullname = "Invalid name format";
    }

    //age, occupation

    setErrors(validateErrors);
=======
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
    let validationErrors = { fullname: "", age: "", occupation: "" };

    // Fullname validation: Only alphabets and a single space allowed
    const fullnameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if (!fullnameRegex.test(formData.fullname)) {
      validationErrors.fullname =
        "Fullname should only contain alphabets and a single space between words.";
      valid = false;
    }

    // Occupation validation: Only alphabets and a single space allowed
    const occupationRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if (!occupationRegex.test(formData.occupation)) {
      validationErrors.occupation =
        "Occupation should only contain alphabets and a single space between words.";
      valid = false;
    }

    // Age validation: Age greater than 18
    if (formData.age <= 18 || isNaN(formData.age) || formData.age === "") {
      validationErrors.age = "Age should be greater than 18.";
      valid = false;
    }

    setErrors(validationErrors);
<<<<<<< HEAD
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
<<<<<<< HEAD
<<<<<<< HEAD
      profile(formData);
      setFormData({ fullname: "", age: "", occupation: "" });
      setErrors({
        fullname: "",
        age: "",
        occupation: "",
      });
=======
      addProfile(formData);
      setFormData({ fullname: "", age: "", occupation: "" });
      setErrors({ fullname: "", age: "", occupation: "" }); // Clear errors on successful submission
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
      addProfile(formData);
      setFormData({ fullname: "", age: "", occupation: "" });
      setErrors({ fullname: "", age: "", occupation: "" }); // Clear errors on successful submission
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
    }
  };

  return (
    <>
      <form className="profile-form" onSubmit={handleSubmit}>
<<<<<<< HEAD
<<<<<<< HEAD
        <h2>{isEditing ? "Update Profile" : "Create Profile"}</h2>
=======
        <h2>{isEditing ? "Edit Profile" : "Profile Form"}</h2>
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
        <h2>{isEditing ? "Edit Profile" : "Profile Form"}</h2>
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)

        <input
          type="text"
          placeholder="FullName"
          name="fullname"
          value={formData.fullname}
          required
          onChange={handleChange}
        />
        {errors.fullname && <p className="error">{errors.fullname}</p>}
<<<<<<< HEAD

        {errors.fullname && <span className="error">{errors.fullname}</span>}
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)

        <input
          type="number"
          placeholder="Age"
          name="age"
          value={formData.age}
          required
          onChange={handleChange}
        />
        {errors.age && <p className="error">{errors.age}</p>}
<<<<<<< HEAD

        {errors.age && <span className="error">{errors.age}</span>}
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)

        <input
          type="text"
          placeholder="Occupation"
          name="occupation"
          value={formData.occupation}
          required
          onChange={handleChange}
        />
        {errors.occupation && <p className="error">{errors.occupation}</p>}

<<<<<<< HEAD
<<<<<<< HEAD
        {errors.occupation && (
          <span className="error">{errors.occupation}</span>
        )}

=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
        <button type="submit">
          {isEditing ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </>
  );
}

export default ProfileForm;
