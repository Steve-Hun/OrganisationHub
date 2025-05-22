import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from "../services/postService";

function PostForm({ userId, isNew }) {
  const [post, setPost] = useState({ description: '' });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { organisationId, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If user choose editing, fetch the existing post
    if (!isNew) {
      const fetchPost = async () => {
        try {
          const data = await postService.getById(organisationId, id);
          setPost(data);
          setError(null);
        } catch (err) {
          setError('Failed to load post');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [isNew, organisationId, id]);

  const handleChange = (event) => {
    setPost({
      description: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setSaving(true);
      if (isNew) {
        await postService.create(organisationId, post);
      } else {
        await postService.update(organisationId, id, post);
      }
      navigate(`/organisations/${organisationId}/posts`);
    } catch (err) {
      setError('Failed to save post');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{isNew ? 'New Post' : 'Edit Post'}</h1>
      
      {error && <div>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={post.description}
            onChange={handleChange}
            required
            rows="5"
          ></textarea>
        </div>
        
        <div>
          <button 
            type="submit" 
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/organisations/${organisationId}/posts`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
