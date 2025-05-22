import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { postService } from "../services/postService";

function PostIndex({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { organisationId } = useParams();
  const [searchParams] = useSearchParams();
  
  // Extract any query parameters for filtering
  const employeeInfo = searchParams.get('employee_info') || '';
  const startDate = searchParams.get('start_date') || '';
  const lastUpdatedDate = searchParams.get('last_updated_date') || '';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Prepare params for API call
        const params = {
          employee_info: employeeInfo,
          start_date: startDate,
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
  }, [organisationId, employeeInfo, startDate, lastUpdatedDate]);

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

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div>
        <h1>Posts</h1>
        <Link to={`/organisations/${organisationId}/posts/new`}>
          New Post
        </Link>
      </div>

      <div>
        <form method="get">
          <div>
            <label htmlFor="employee_info">Employee Name or Email:</label>
            <input 
              type="text" 
              id="employee_info" 
              name="employee_info" 
              defaultValue={employeeInfo} 
            />
          </div>
          
          <div>
            <label htmlFor="start_date">Start Date:</label>
            <input 
              type="date" 
              id="start_date" 
              name="start_date" 
              defaultValue={startDate}
            />
          </div>
          
          <div>
            <label htmlFor="last_updated_date">Last Updated:</label>
            <input 
              type="date" 
              id="last_updated_date" 
              name="last_updated_date" 
              defaultValue={lastUpdatedDate}
            />
          </div>
          
          
          <button type="submit">Filter</button>
        </form>
      </div>

      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <div>
          {posts.map(post => (
            <div key={post.id}>
              <h3>
                <Link to={`/organisations/${organisationId}/posts/${post.id}`}>
                  Post by {post.user?.email_address}
                </Link>
              </h3>
              <p>{post.description}</p>
              <div>
                <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                {post.user_id === userId && (
                  <div>
                    <Link to={`/organisations/${organisationId}/posts/${post.id}/edit`}>
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.id)} 
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
