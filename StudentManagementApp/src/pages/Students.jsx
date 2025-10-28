// src/pages/Students.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchName = queryParams.get("name");
    const [file, setFile] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Fetch students from backend
  useEffect(() => {
    fetchStudents();
  });

  const fetchStudents = async () => {
    try {
      const url = searchName
        ? `http://localhost:8080/api/students/search?name=${searchName}`
        : "http://localhost:8080/api/students";
      const response = await axios.get(url);
      setStudents(response.data);
    } catch (error) {
      console.error(" Error fetching students:", error);
    }
  };

  // 🔹 Delete student from backend
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
      toast.success("🗑️ Student deleted successfully!");
    } catch (error) {
      toast.error(" Failed to delete student." + error.message);
      console.error(" Error deleting student:", error);
    }
  };

  // 🔹 Edit student
  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };
  // Import Excel file
  const handleImport = async () => {
    if (!file) {
      alert("Please choose an Excel file first!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("http://localhost:8080/api/files/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Students imported successfully!");
      setFile(null);
      fetchStudents();
    } catch (error) {
      console.error("Error importing file:", error);
      alert("❌ Failed to import students. Please check file format.");
    }
  };

  // Export Excel file
  const handleExport = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/files/export", {
        responseType: "blob", // important for file download
      });

      // Create a temporary link element to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "students.xls");
      document.body.appendChild(link);
      link.click();
      link.remove();

      alert("✅ Students exported successfully!");
    } catch (error) {
      console.error("Error exporting file:", error);
      alert("❌ Failed to export students.");
    }
  };

    // Filter logic
  // const filteredStudents = students.filter((s) =>
  //   s.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // 🔹 Count logic
  const highAchievers = students.filter((s) => s.marks > 80).length;
  const lowPerformers = students.filter((s) => s.marks < 40).length;

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

        {/* Import/Export Section */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="file"
          accept=".xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          onClick={handleImport}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Import Excel
        </button>
        <button
          onClick={handleExport}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all"
        >
          Export Excel
        </button>
      </div>

        {/* Student Table */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-indigo-600 text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Marks</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-indigo-50 transition"
                  >
                    <td className="px-6 py-3">{student.id}</td>
                    <td className="px-6 py-3 font-medium text-gray-700">
                      {student.name}
                    </td>
                    <td className="px-6 py-3">{student.email}</td>
                    <td className="px-6 py-3">{student.course}</td>
                    <td
                      className={`px-6 py-3 font-semibold ${student.marks > 80
                        ? "text-green-600"
                        : student.marks < 40
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
      </div>
    </div>
  );
};

export default Students;
