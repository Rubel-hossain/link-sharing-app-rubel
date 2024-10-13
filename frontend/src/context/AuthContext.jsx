import React from 'react';
import useLocalStorage from '../custom-hooks/useLocalStorage';

const AuthContext = React.createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);

  const updateLoginStatus = async () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        updateLoginStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
