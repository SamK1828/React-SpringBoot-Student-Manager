// src/pages/EditStudent.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    marks: "",
  });

  // Fetch existing student data (later from backend)
  useEffect(() => {
    // Example placeholder for backend fetch
    // axios.get(`http://localhost:8080/api/students/${id}`).then(res => setStudent(res.data));
    setStudent({
      name: "",
      email: "",
      course: "",
      marks: "",
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Student:", student);
    // later -> axios.put(`http://localhost:8080/api/students/${id}`, student);
    navigate("/students");
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
