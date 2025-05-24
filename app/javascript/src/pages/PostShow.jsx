import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import '../../entrypoints/application.css';

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
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          Post Details
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Posted by: {post.user?.email_address || 'Unknown User'}
        </p>

        <div className="mb-6 pt-6 border-t border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Description</h2>
          <p className="text-gray-800 text-lg">{post.description}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
          <p>Created: {new Date(post.created_at).toLocaleString()}</p>
          {post.updated_at !== post.created_at && (
            <p>Last updated: {new Date(post.updated_at).toLocaleString()}</p>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap justify-center items-center gap-3">
          <Link
            to={`/organisations/${organisationId}/posts`}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition duration-150 ease-in-out"
          >
            Back to All Posts
          </Link>
          {/* Only show edit and delete buttons if the current user is the owner of the post */}
          {post.user_id === userId && (
            <>
              <Link
                to={`/organisations/${organisationId}/posts/${id}/edit`}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition duration-150 ease-in-out"
              >
                Edit Post
              </Link>
              <button
                onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg shadow-sm transition duration-150 ease-in-out"
              >
                Delete Post
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostShow;
