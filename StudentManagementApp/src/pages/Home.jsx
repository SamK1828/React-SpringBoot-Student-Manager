// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Student Management System
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Manage your students efficiently — add, edit, and view student details
        with ease. Built using React, TailwindCSS, and Spring Boot.
      </p>
      <button
        onClick={() => navigate("/students")}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
      >
        View Students
      </button>
    </div>
  );
};

export default Home;
