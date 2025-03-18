import React, { createContext, useContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Retrieve username from localStorage
  const storedUsername = localStorage.getItem("authUsername");

  const initialState = storedUsername
    ? { isAuthenticated: true, user: { username: storedUsername } }
    : { isAuthenticated: false, user: null };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Store only the username in localStorage
  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem("authUsername", state.user.username);
    } else {
      localStorage.removeItem("authUsername");
    }
  }, [state]);

  const login = (username) => {
    dispatch({ type: "LOGIN", payload: username });
  };

  const updateProfile = (updates) => {
    dispatch({ type: "UPDATE", payload: updates });
  };

  const logout = () => {
    localStorage.removeItem("authUsername");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
