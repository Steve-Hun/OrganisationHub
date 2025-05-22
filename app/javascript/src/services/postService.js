const API_URL = '/api';

export const postService = {
  getAllByOrganisation: (orgId, filters = {}) => {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const queryString = queryParams.toString();
    return get(`/organisations/${orgId}/posts${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (orgId, id) => {
    return get(`/organisations/${orgId}/posts/${id}`);
  },
  
  create: (orgId, data) => {
    return post(`/organisations/${orgId}/posts`, { post: data });
  },
  
  update: (orgId, id, data) => {
    return put(`/organisations/${orgId}/posts/${id}`, { post: data });
  },
  
  delete: (orgId, id) => {
    return del(`/organisations/${orgId}/posts/${id}`);
  }
};


async function get(path) {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': window.csrfToken
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
}
  
async function post(path, data) {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': window.csrfToken
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
    }
  
async function put(path, data) {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': window.csrfToken
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  }
  
  async function del(path) {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': window.csrfToken
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return true;
  }
