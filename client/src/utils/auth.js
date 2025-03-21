export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await axios.post('http://localhost:3000/api/users/refresh', {
      refreshToken
    });
    
    const newAccessToken = res.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    
    return newAccessToken;
  } catch (error) {
    // If refresh fails, log out user
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
    throw error;
  }
}; 