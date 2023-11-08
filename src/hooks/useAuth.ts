import { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function useAuth() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

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
        setIsAuthenticated(true);
      } else {
        // Token validation failed
        setIsAuthenticated(false);
        // Optionally, clear the client-side state or redirect to login
      }
    } catch (error) {
      console.error('Token validation error:', error);
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]);

  // Call validateToken on hook initialization
  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        // No redirect here, just return success status
        return true;
      } else {
        // Handle different error statuses here
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      setIsAuthenticated(false);
      // Return or throw the error for the component to handle
      throw error;
    }
  };

  const logout = () => {
    // Perform logout
    // Clear user context and tokens
    setIsAuthenticated(false);
    // Clear tokens from storage/cookies
  };

  const refresh = async () => {
    // Call the refresh-token API handler
    // Similar to login, make a fetch request to the refresh token endpoint
  };

  return {
    isAuthenticated,
    login,
    logout,
    refresh,
    setIsAuthenticated,
  };
}
