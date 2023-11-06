import { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function useAuth() {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useContext(AuthContext);

  // Function to validate the token and set user state
  const validateToken = useCallback(async () => {
    try {
      // Since the token is HTTP-only, you don't need to manually set the Authorization header
      const response = await fetch('/api/validate', {
        method: 'POST',
        // Ensure credentials are included with the request
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        // Token validation failed
        setUser(null);
        setIsAuthenticated(false);
        // Optionally, clear the client-side state or redirect to login
      }
    } catch (error) {
      console.error('Token validation error:', error);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [setUser, setIsAuthenticated]);

  // Call validateToken on hook initialization
  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const login = async (username: string, password: string) => {
    try {
      // Make a POST request to the login API route
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update context with the user and authentication status
        setUser(data.user); // Assuming 'data.user' contains user information
        setIsAuthenticated(true);
        // You might want to handle token storage here if not already handled in the API route
      } else {
        // Handle errors, e.g., invalid credentials
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    // Perform logout
    // Clear user context and tokens
    setUser(null);
    setIsAuthenticated(false);
    // Clear tokens from storage/cookies
  };

  const refresh = async () => {
    // Call the refresh-token API handler
    // Similar to login, make a fetch request to the refresh token endpoint
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    refresh,
    setUser,
    setIsAuthenticated,
  };
}
