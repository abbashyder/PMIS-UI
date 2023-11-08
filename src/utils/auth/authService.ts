// Function to check if the user's token is valid
export async function checkUserAuthentication() {
    const response = await fetch('/api/auth/validate', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return { user: data.user, isAuthenticated: true };
    } else {
      return { user: null, isAuthenticated: false };
    }
  }
  
  // Function to authenticate the user and get their details
  export async function authenticateUser(username: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      return { user: data.user, isAuthenticated: true };
    } else {
      throw new Error('Authentication failed');
    }
  }
  
  // You can add other API call functions like signOutUser and refreshToken here...
  