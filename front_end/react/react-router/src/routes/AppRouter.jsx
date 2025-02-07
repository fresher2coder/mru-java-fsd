import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";

function AppRouter() {
  return (
    <>
      <Router>
        <MainLayout name="main layout">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </MainLayout>
      </Router>
    </>
  );
}

export default AppRouter;
