import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { AuthProvider } from "../contexts/AuthContext";

function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
