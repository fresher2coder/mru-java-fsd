import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
