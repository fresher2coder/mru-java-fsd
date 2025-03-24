import React, { createContext, useContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/authReducer";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = { isAuthenticated: false, user: null };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/check-auth",
          {
            withCredentials: true, // Include cookies in request
          }
        );

        if (response.status === 200) {
          dispatch({ type: "LOGIN", payload: response.data.username });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []); // Run only once when component mounts

  const login = (username) => {
    dispatch({ type: "LOGIN", payload: username });
  };

  const updateProfile = (updates) => {
    dispatch({ type: "UPDATE", payload: updates });
  };

  const logout = async () => {
    await fetch("http://localhost:8080/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
