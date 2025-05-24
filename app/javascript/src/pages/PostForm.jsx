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

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900">{isNew ? 'Create New Post' : 'Edit Post'}</h1>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="description"
              name="description"
              value={post.description}
              onChange={handleChange}
              required
              rows="5"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter post description..."
            ></textarea>
          </div>
          
          <div className="flex items-center justify-between space-x-3">
            <button
              type="button"
              onClick={() => navigate(`/organisations/${organisationId}/posts`)}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={saving}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {saving ? 'Saving...' : (isNew ? 'Create Post' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
