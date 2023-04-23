export default (() => {
  const apiUrl = 'https://api.hebale.com';
  
  const request = async (endpoint, options) => {
    const response = await fetch(endpoint, options);
    const data = await response.json();

    return data;
  };

  return {
    get: async (path, params, options = {}) => {
      const endpoint = `${apiUrl}${path}${params ? `?${queryString(params)}` : ''}`;

      return request(endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        ...options
      })
    },
    post: async (path, data, params, options = {}) => {
      const endpoint = `${apiUrl}${path}${params ? `?${queryString(params)}` : ''}`;

      return request(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        ...(data && { body: JSON.stringify(data), ...options})
      })
    },
    patch: async (path, data, params, options = {}) => {
      const endpoint = `${apiUrl}${path}${params ? `?${queryString(params)}` : ''}`;

      return request(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        ...(data && { body: JSON.stringify(data), ...options})
      })
    },
    delete: async (path, params) => {
      const endpoint = `${apiUrl}${path}${params ? `?${queryString(params)}` : ''}`;

      return request(endpoint, {
        method: 'DELETE'
      })
    },
  }
})();