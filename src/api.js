import axios from 'axios';

const api = axios.create({
    baseURL: 'https://aidea-backend.onrender.com', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      return response.data;  
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;  
    }
  };

  export const userSignup = async (userData) => {
    try {
      const response = await api.post('/signup', userData);
      return response.data;  
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;  
    }
  };

  export const getPostById = async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };
  