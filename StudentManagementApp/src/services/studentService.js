// import axios from "axios";

// const API_BASE =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/students";

// export const getStudents = () => axios.get(API_BASE);
// export const getStudent = (id) => axios.get(`${API_BASE}/${id}`);
// export const createStudent = (student) => axios.post(API_BASE, student);
// export const updateStudent = (id, student) =>
//   axios.put(`${API_BASE}/${id}`, student);
// export const deleteStudent = (id) => axios.delete(`${API_BASE}/${id}`);
// // export const searchStudents = (query) => axios.get(`${API_BASE}/search`, { params: { q: query } });

// src/services/studentService.js
import axios from "axios";
import authService from "./authService";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/students";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Request interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token expired or unauthorized - logout and redirect
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export API functions
export const getStudents = () => axiosInstance.get('');
export const getStudent = (id) => axiosInstance.get(`/${id}`);
export const createStudent = (student) => axiosInstance.post('', student);
export const updateStudent = (id, student) => axiosInstance.put(`/${id}`, student);
export const deleteStudent = (id) => axiosInstance.delete(`/${id}`);
// export const searchStudents = (query) => axiosInstance.get('/search', { params: { q: query } });
