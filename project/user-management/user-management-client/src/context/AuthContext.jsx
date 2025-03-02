import React, { createContext, useContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = { isAuthenticated: false, user: null };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => dispatch({ type: "LOGIN", payload: user });
  const updateProfile = (user) => dispatch({ type: "UPDATE", payload: user });
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
