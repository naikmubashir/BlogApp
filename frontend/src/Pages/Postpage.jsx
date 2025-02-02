import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost,updatePost, deletePost } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated]=useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await getPost(id);
        setPost(data.post);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      if(isAuthenticated){
        await deletePost(id);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <><Navbar/>
    <div className="container">
      <article className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="card-title">{post.title}</h1>
            <div className="btn-group">
              <button 
                onClick={handleDelete}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
              <Link
                to={`/posts/edit/${post._id}`}
                className="btn btn-secondary btn-sm"
              >
                Edit
              </Link>
            </div>
          </div>
          <p className="card-text">{post.content}</p>
          <div className="text-muted small mt-4">
            <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
            {post.updatedAt && (
              <p>Updated: {new Date(post.updatedAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      </article>
    </div>
    </>
  );
}