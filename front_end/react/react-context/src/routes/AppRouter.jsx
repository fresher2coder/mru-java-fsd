import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Dashboard from "../pages/Dashbboard";
import Users from "../pages/Users";
import User from "../components/User";

function AppRouter() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default AppRouter;
