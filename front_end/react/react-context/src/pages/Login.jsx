import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <h3>Login Page</h3>
      <button onClick={handleLogin}>Login</button>
      {isLoggedIn && (
        <>
          <p>Login is Success</p>
        </>
      )}
    </>
  );
}

export default Login;
