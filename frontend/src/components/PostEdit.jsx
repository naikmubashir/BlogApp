import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../services/api';

export default function PostEdit({title, content }) {
    const {id}= useParams();
    const [formData, setFormData] = useState({
        title: title,
        content: content
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost(id, formData);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3>Edit Post</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Content</label>
                                    <textarea
                                        className="form-control"
                                        id="content"
                                        rows="5"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}