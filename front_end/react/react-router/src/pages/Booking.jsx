import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Booking() {
  const [formData, setFormData] = useState({
    fullname: "",
    destination: "",
    doj: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/confirmation", { state: formData });
  };
  return (
    <>
      <h2>Book Your Tickets</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
        />
        <input
          type="date"
          name="doj"
          placeholder="Date of Journey"
          value={formData.doj}
          onChange={handleChange}
        />
        <button type="submit">Book</button>
      </form>
    </>
  );
}

export default Booking;
