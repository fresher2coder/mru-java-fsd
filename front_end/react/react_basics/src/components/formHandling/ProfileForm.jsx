import React, { useState, useEffect } from "react";
import { validate } from "uuid";

function ProfileForm(props) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
  const { profile, initialData = {}, isEditing = false } = props;
=======
  const { addProfile, initialData = {}, isEditing = false } = props;
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
<<<<<<< HEAD
=======
  const { addProfile, initialData = {}, isEditing = false } = props;
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
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
<<<<<<< HEAD
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008

  const [errors, setErrors] = useState({
    fullname: "",
    age: "",
    occupation: "",
  });

  useEffect(() => {
    if (isEditing) setFormData(initialData);
  }, [initialData, isEditing]);
<<<<<<< HEAD
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008

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
<<<<<<< HEAD
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
    let validateErrors = { fullname: "", age: "", occupation: "" };

    const fullNameRegex = /^[A-Za-z]+(?:[A-Za-z]+)*$/;

    if (!fullNameRegex.test(formData.fullname)) {
      valid = false;
      validateErrors.fullname = "Invalid name format";
    }

    //age, occupation

    setErrors(validateErrors);
=======
<<<<<<< HEAD
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
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
<<<<<<< HEAD
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
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
<<<<<<< HEAD
=======
      addProfile(formData);
      setFormData({ fullname: "", age: "", occupation: "" });
      setErrors({ fullname: "", age: "", occupation: "" }); // Clear errors on successful submission
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
    }
  };

  return (
    <>
      <form className="profile-form" onSubmit={handleSubmit}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
        <h2>{isEditing ? "Update Profile" : "Create Profile"}</h2>
=======
        <h2>{isEditing ? "Edit Profile" : "Profile Form"}</h2>
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
<<<<<<< HEAD
=======
        <h2>{isEditing ? "Edit Profile" : "Profile Form"}</h2>
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008

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
<<<<<<< HEAD

        {errors.fullname && <span className="error">{errors.fullname}</span>}
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======

        {errors.fullname && <span className="error">{errors.fullname}</span>}
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008

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
<<<<<<< HEAD

        {errors.age && <span className="error">{errors.age}</span>}
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======

        {errors.age && <span className="error">{errors.age}</span>}
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008

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
<<<<<<< HEAD
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
        {errors.occupation && (
          <span className="error">{errors.occupation}</span>
        )}

=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
<<<<<<< HEAD
=======
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
        <button type="submit">
          {isEditing ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </>
  );
}

export default ProfileForm;
