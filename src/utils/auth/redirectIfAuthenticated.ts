import { NextRouter } from 'next/router';

export const redirectIfAuthenticated = (isAuthenticated: boolean, router: NextRouter) => {
  if (isAuthenticated) {
    // Use 'replace' to prevent going back to the login page
    router.replace('/dashboard');
  }
};
