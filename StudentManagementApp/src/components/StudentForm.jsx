import { useState } from "react";

const StudentForm = ({ students, setStudents }) => {
  const [form, setForm] = useState({ name: "", marks: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.marks) return;

    const newStudent = {
      id: students.length + 1,
      ...form,
      marks: parseInt(form.marks),
    };

    setStudents([...students, newStudent]);
    setForm({ name: "", marks: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-indigo-100">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">
        ➕ Add New Student
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Enter student name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="number"
          name="marks"
          placeholder="Enter marks"
          value={form.marks}
          onChange={handleChange}
          className="w-full p-3 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-700 text-white px-6 py-2 rounded-md hover:bg-indigo-800 transition"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
