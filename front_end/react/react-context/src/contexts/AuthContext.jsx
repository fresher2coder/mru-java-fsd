import { Children, createContext, useContext, useState } from "react";

//CONTEXT
export const AuthContext = createContext();

//PROVIDER
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

//CONSUMER
export const useAuth = () => useContext(AuthContext);
