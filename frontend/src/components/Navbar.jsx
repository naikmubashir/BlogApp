import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../services/api'; // Make sure your logout function is correct
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useAuth(); // Get authentication state from context

  const handleLogout = async () => {
    try {
      await logoutUser(); // Logout the user
      setIsAuthenticated(false); // Update the authentication state
    } catch (err) {
      setError('Logout failed. Please try again later.');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Blog App</Link>
        <div className="navbar-nav">
          {isAuthenticated ? (
            <>
              <Link className="nav-link" to="/create">Create Post</Link>
              <button onClick={handleLogout} className="nav-link btn btn-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
