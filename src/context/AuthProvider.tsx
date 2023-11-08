'use client';
import React, { useState, ReactNode } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const contextValue = {
    user,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
