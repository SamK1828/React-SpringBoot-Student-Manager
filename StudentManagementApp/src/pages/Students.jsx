// src/pages/Students.jsx
import React from "react";
import { Link } from "react-router-dom";

const Students = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-indigo-800">Students</h1>
          <Link
            to="/students/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            + Add Student
          </Link>
        </div>

        {/* Student Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-indigo-50">
            <h2 className="text-lg font-medium text-indigo-800">John Doe</h2>
            <p className="text-sm text-gray-700">Course: React JS</p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-indigo-50">
            <h2 className="text-lg font-medium text-indigo-800">Jane Smith</h2>
            <p className="text-sm text-gray-700">Course: Spring Boot</p>
          </div>
          {/* ...more student cards */}
        </div>
      </div>
    </div>
  );
};

export default Students;
