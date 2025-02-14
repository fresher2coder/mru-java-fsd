import React from "react";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UsersContext";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
