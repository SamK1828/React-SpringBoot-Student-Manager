// src/pages/Students.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/students";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Load students from backend
  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setStudents(res.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Delete student (calls backend then refreshes list)
  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this student?");
    if (!ok) return;

    try {
      await axios.delete(`${API}/${id}`);
      // remove locally for instant UI feedback
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Delete failed. Check console.");
    }
  };

  // Edit student - navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`); // keep same route you used earlier
  };

  // Count logic
  const highAchievers = students.filter((s) => Number(s.marks) > 80).length;
  const lowPerformers = students.filter((s) => Number(s.marks) < 40).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4 md:mb-0">
            🎓 Student Dashboard
          </h1>

          {/* Count Section */}
          <div className="flex gap-4">
            <div className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg shadow-sm">
              Marks {">"} 80: {highAchievers}
            </div>
            <div className="bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-lg shadow-sm">
              Marks {"<"} 40: {lowPerformers}
            </div>
          </div>
        </div>

        {/* Loading / Error */}
        {loading ? (
          <div className="text-center p-10 text-gray-600">Loading students...</div>
        ) : error ? (
          <div className="text-center p-6 text-red-600">{error}</div>
        ) : (
          /* Student Table */
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-600 text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Course</th>
                  <th className="px-6 py-3">Marks</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-indigo-50 transition">
                      <td className="px-6 py-3">{student.id}</td>
                      <td className="px-6 py-3 font-medium text-gray-700">{student.name}</td>
                      <td className="px-6 py-3">{student.course}</td>
                      <td
                        className={`px-6 py-3 font-semibold ${Number(student.marks) > 80
                            ? "text-green-600"
                            : Number(student.marks) < 40
                              ? "text-red-600"
                              : "text-gray-700"
                          }`}
                      >
                        {student.marks}
                      </td>
                      <td className="px-6 py-3 text-center space-x-3">
                        <button
                          onClick={() => handleEdit(student.id)}
                          className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
