import React from "react";
import { useLocation } from "react-router-dom";

function Confirmation() {
  const location = useLocation(); //{ state: formData }

  const { fullname, destination, doj } = location.state || {};

  return (
    <>
      <h2>Booking Comfirmation</h2>
      <p>
        Hi {fullname}! Your ticket to {destination} is confirmed on {doj}
      </p>
      <p>Happy Journey!</p>
    </>
  );
}

export default Confirmation;
