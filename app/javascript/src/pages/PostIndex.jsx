import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { postService } from "../services/postService";

function PostIndex({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { organisationId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Extract any query parameters for filtering
  const employeeInfo = searchParams.get('employee_info') || '';
  const createdDate = searchParams.get('created_date') || '';
  const lastUpdatedDate = searchParams.get('last_updated_date') || '';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Prepare params for API call
        const params = {
          employee_info: employeeInfo,
          created_date: createdDate,
          last_updated_date: lastUpdatedDate
        };

        // Pass the filters to the API
        const data = await postService.getAllByOrganisation(organisationId, params);

        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load posts from server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [organisationId, employeeInfo, createdDate, lastUpdatedDate]);

  const handleDelete = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await postService.delete(organisationId, postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
    }
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newParams = {
      employee_info: formData.get('employee_info'),
      created_date: formData.get('created_date'),
      last_updated_date: formData.get('last_updated_date'),
    };
    setSearchParams(newParams);
  };
  

  if (loading) return <div className="flex justify-center items-center h-screen">Loading posts...</div>;
  if (error) return <div className="text-red-500 text-center p-4 bg-red-100 border border-red-400 rounded-md">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
        <Link 
          to={`/organisations/${organisationId}/posts/new`}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          New Post
        </Link>
      </div>

      <hr className="mb-6 border-2 border-gray-300" />

      <form onSubmit={handleFilterSubmit} className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <label htmlFor="employee_info" className="block text-sm font-medium text-gray-700 mb-1">Employee Name or Email:</label>
            <input 
              type="text" 
              id="employee_info" 
              name="employee_info" 
              defaultValue={employeeInfo} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="created_date" className="block text-sm font-medium text-gray-700 mb-1">Created Date:</label>
            <input 
              type="date" 
              id="created_date" 
              name="created_date" 
              defaultValue={createdDate}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="last_updated_date" className="block text-sm font-medium text-gray-700 mb-1">Last Updated:</label>
            <input 
              type="date" 
              id="last_updated_date" 
              name="last_updated_date" 
              defaultValue={lastUpdatedDate}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
          
        <div className="flex items-center space-x-4">
          <button 
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Filter
          </button>
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear Filters
          </button>
        </div>
      </form>
      
      <hr className="mb-8 border-2 border-gray-300" />

      {posts.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600">No posts found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                <Link to={`/organisations/${organisationId}/posts/${post.id}`} className="hover:text-indigo-600">
                  Post by {post.user?.email_address || 'Unknown User'}
                </Link>
              </h3>
              <p className="text-gray-700 mb-3">{post.description}</p>
              <div className="text-sm text-gray-500">
                <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                {post.user_id === userId && (
                  <div className="mt-3 flex space-x-3">
                    <Link 
                      to={`/organisations/${organisationId}/posts/${post.id}/edit`}
                      className="text-white bg-indigo-600 hover:bg-indigo-700 font-medium px-4 py-2 rounded-md shadow-sm"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.id)} 
                      className="text-white bg-red-600 hover:bg-red-700 font-medium px-4 py-2 rounded-md shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostIndex;
