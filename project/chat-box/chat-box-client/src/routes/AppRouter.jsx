import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ChatComponent from "../pages/ChatComponent";

function AppRouter() {
  return (
    <>
      <Router>
        <AuthProvider>
          <MainLayout>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatComponent />
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
