import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8001/api/posts');
        console.log(res)
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {posts.map(post => (
          <div className="col-md-4 mb-4" key={post._id}>
            <Link to={`/posts/${post._id}`} className="card h-100 text-decoration-none text-dark">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
