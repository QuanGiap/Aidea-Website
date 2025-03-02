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
     const formattedData = JSON.parse(JSON.stringify(userData)); // Ensures a consistent order
     console.log("Sending signup request with data:", formattedData);
     const response = await api.post('/signup', formattedData);
     return response.data;
   } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data : error.message);
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
  
  export const userLogin = async (username, password) => {
    try {
      const response = await api.post("/login", { username, password }); 
      return response.data; 
    } catch (error) {
      console.error("Login error:", error.response?.data?.detail || error.message);
      throw error;
    }
  };