import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

import LoginForm from "../pages/Login";
import Profile from "../pages/Profile";
import { AuthProvider } from "../context/AuthContext";
import About from "../pages/About";
import UserRegistration from "../pages/UserRegistration";

function AppRouter() {
  return (
    <>
      <Router>
        <AuthProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<UserRegistration />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MainLayout>
        </AuthProvider>
      </Router>
    </>
  );
}

export default AppRouter;
