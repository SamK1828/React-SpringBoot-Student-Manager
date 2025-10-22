// src/pages/EditStudent.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    marks: "",
  });

  // 🔹 Fetch student data when component loads
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("❌ Error fetching student:", error);
      }
    };
    
    fetchStudent();
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // 🔹 Update student in backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/students/${id}`, student);
      alert("✅ Student updated successfully!");
      navigate("/students");
    } catch (error) {
      console.error("❌ Error updating student:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
        Edit Student Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Course</label>
          <input
            type="text"
            name="course"
            value={student.course}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Marks</label>
          <input
            type="number"
            name="marks"
            value={student.marks}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-all"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
