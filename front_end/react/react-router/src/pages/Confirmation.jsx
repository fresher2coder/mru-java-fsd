import React from "react";
import { useLocation } from "react-router-dom";

function Confirmation() {
  const location = useLocation(); //{state: formData}
  const { fullname, destination, doj } = location.state || {};
  return (
    <>
      <section className="container">
        <h1>Hi {fullname}!</h1>
        <h3>
          Your ticket to {destination} is confirmed on {doj}
        </h3>
      </section>
    </>
  );
}

export default Confirmation;
