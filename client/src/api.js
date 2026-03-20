import axios from 'axios';


const API = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' 
});

// ... rest of your interceptor logic stays the same

// Interceptor that ONLY targets write operations
API.interceptors.request.use((config) => {
  const method = config.method.toUpperCase();
  const pwd = localStorage.getItem('adminPassword');

  // Logic: Only attach the password for Create (POST) or Delete (DELETE)
  if ((method === 'POST' || method === 'DELETE') && pwd) {
    config.headers['x-admin-password'] = pwd;
    console.log(`Admin Header attached to ${method} request`);
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


const handleAdminAuth = () => {
  const password = prompt("SOHC Admin Access:");
  if (password) {
    localStorage.setItem('adminPassword', password);
    alert("Admin Credentials Stored.");
  }
};

// Logic functions for your components to use
export const getUpcomingShows = () => API.get('/shows/upcoming');
export const getShowById = (id) => API.get(`/shows/${id}`);
export const createShow = (showData) => API.post('/shows', showData);
export const deleteShow = (id) => API.delete(`/shows/${id}`);

export default API;