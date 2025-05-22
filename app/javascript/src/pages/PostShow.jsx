import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';

function PostShow({ userId }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { organisationId, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
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
  }, [organisationId, id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await postService.delete(organisationId, id);
      navigate(`/organisations/${organisationId}/posts`);
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <div>
        <h1>Post by {post.user?.email_address}</h1>
        <div>
          <Link to={`/organisations/${organisationId}/posts`}>
            Back to Posts
          </Link>
          {/* Only show edit and delete buttons if the current user is the owner of the post */}
          {post.user_id === userId && (
            <>
              <Link to={`/organisations/${organisationId}/posts/${id}/edit`}>
                Edit
              </Link>
              <button onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        <p>{post.description}</p>
      </div>

      <div>
        <p>Created: {new Date(post.created_at).toLocaleString()}</p>
        {post.updated_at !== post.created_at && (
          <p>Last updated: {new Date(post.updated_at).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}

export default PostShow;
