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
    // navigate to confirmation page
    event.preventDefault();
    navigate("/confirmation", { state: formData });
  };

  return (
    <>
      <section className="container">
        <h2>Book Your Flight</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date of Journey</label>
            <input
              type="date"
              name="doj"
              value={formData.doj}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Book</button>
        </form>
      </section>
    </>
  );
}

export default Booking;
