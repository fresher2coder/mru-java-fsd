import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Services() {
  return (
    <>
      <h2>Services List:</h2>
      <ul>
        <li>
          <NavLink to="service1">Service 1</NavLink>
        </li>
        <li>
          <NavLink to="service2">Service 2</NavLink>
        </li>
        <li>
          <NavLink to="service3">Service 3</NavLink>
        </li>
      </ul>

      {/* placeholder to render the child */}
      <Outlet />
    </>
  );
}

export default Services;
