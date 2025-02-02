import {  useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ element}) => {
        const navigate = useNavigate()
        // const [loader, setLoader] = useState(true)

  const [isAuthenticated, setIsAuthenticated] = useAuth(); // Get the authentication state
  console.log(isAuthenticated)
  return isAuthenticated ? element : <Navigate to="/login" replace />;

  useEffect(() => {
    if(isAuthenticated ){
        navigate("/")
    } else {
        navigate("/login")
    }
    // setLoader(false)
}, [isAuthenticated])

// return loader ? <h1>Loading...</h1> : <>{element}</>

  return element; // Render the requested element if authenticated
};

export default ProtectedRoute;
