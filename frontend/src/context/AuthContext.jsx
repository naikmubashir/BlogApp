import { createContext, useContext, useState, useEffect } from 'react';
import { isLoggedIn } from '../services/api'; // Import your API function to check login status

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    checkLoggedIn(); // Check if the user is logged in when the component is mounted
  }, []);

  const checkLoggedIn = async () => {
    try {
      const { data } = await isLoggedIn(); // Assuming isLoggedIn returns a promise
      if (data) setIsAuthenticated(true); // Set user as logged in
      else setIsAuthenticated(false); // Set user as not logged in
    } catch (err) {
      setIsAuthenticated(false); // Handle error and set as logged out
      console.error('Error checking login status:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication state
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return [authContext.isAuthenticated, authContext.setIsAuthenticated];
};
