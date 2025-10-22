// src/pages/AddStudent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    marks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔗 POST to backend
      await axios.post("http://localhost:8080/api/students", student);
      alert("✅ Student added successfully!");
      navigate("/students");
    } catch (error) {
      console.error("❌ Error adding student:", error);
      alert("Failed to add student. Please check backend connection.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Add New Student
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {["name", "email", "course", "marks"].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-medium mb-2 capitalize">
              {field}
            </label>
            <input
              type={field === "email" ? "email" : field === "marks" ? "number" : "text"}
              name={field}
              value={student[field]}
              onChange={handleChange}
              placeholder={`Enter student ${field}`}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-all"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
