import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { state, loading } = useAuth();

  console.log(loading);
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }
  return state.isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
