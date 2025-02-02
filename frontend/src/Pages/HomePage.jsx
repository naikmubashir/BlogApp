import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import BlogList from '../components/BlogList'
import { isLoggedIn } from '../services/api'

const HomePage = () => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
    // Check if the user is logged in by calling the /me route    
        try {
        // If the response is true, set the user as authenticated
        const { data } =  isLoggedIn();
        if(data) setIsAuthenticated(true);
        else setIsAuthenticated(false);
        } catch (err) {
        setIsAuthenticated(false);
        }
    }, []);
    


  return (
    <>
      <Navbar isUser={isAuthenticated}/>
      <BlogList/>
    </>
  )
}

export default HomePage
