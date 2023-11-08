import { createContext } from 'react';

// Define the shape of your context data
interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
});
