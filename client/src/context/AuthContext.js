import React, { createContext } from 'react';

import { useAuth } from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const { isAuthenticated, isLoading, handleLogin, handleLogout } = useAuth();

  return (
    <Context.Provider value={{ isLoading, isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };