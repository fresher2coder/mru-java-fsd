import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "../pages/Dashbboard";

import { UserProvider } from "../contexts/UserContext";
import Users from "../pages/Users";
import User from "../components/User";

function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <MainLayout>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </MainLayout>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
