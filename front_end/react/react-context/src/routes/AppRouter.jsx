import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "../pages/Dashbboard";

function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
