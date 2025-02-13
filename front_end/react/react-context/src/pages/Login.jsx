import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Login Page</h3>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        {isLoggedIn && <p className="login-success">Login is Success</p>}
      </div>
    </div>
  );
}

export default Login;
