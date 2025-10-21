import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/students";

export const getStudents = () => axios.get(API_BASE);
export const getStudent = (id) => axios.get(`${API_BASE}/${id}`);
export const createStudent = (student) => axios.post(API_BASE, student);
export const updateStudent = (id, student) => axios.put(`${API_BASE}/${id}`, student);
export const deleteStudent = (id) => axios.delete(`${API_BASE}/${id}`);
// export const searchStudents = (query) => axios.get(`${API_BASE}/search`, { params: { q: query } });