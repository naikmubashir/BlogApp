import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import HomePage from './Pages/HomePage';
import Postpage from './Pages/Postpage';
import PostFormPage from './Pages/PostFormPage';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import PostEdit from './components/PostEdit';
import PostEditPage from './Pages/PostEditPage';
// import BlogList from './components/BlogList';
// import BlogPost from './components/BlogPost';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/posts/:id" element={<Postpage />} />
        <Route path="/posts/edit/:id" element={<ProtectedRoute element={<PostEditPage />} />} />
        {/* <Route path="/create" element={<ProtectedRoute  element={<PostFormPage />} />} /> */}
        <Route path="/create" element={<ProtectedRoute element={<PostFormPage />} />} />
      </Routes>
    </Router>
  );
}
