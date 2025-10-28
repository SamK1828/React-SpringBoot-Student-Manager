import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ImportExport = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Import Students
    const handleImport = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.warn("⚠️ Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            await axios.post("http://localhost:8080/api/students/import", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("✅ Students imported successfully!");
            setFile(null);
        } catch (error) {
            toast.error("❌ Failed to import file!" + (error.response?.data?.message || ""));
        } finally {
            setLoading(false);
        }
    };

    // Export Students
    const handleExport = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8080/api/students/export", {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "students.xlsx");
            document.body.appendChild(link);
            link.click();

            toast.info("📤 Export successful! File downloaded.");
        } catch (error) {

            toast.error("❌ Failed to export students!" + (error.response?.data?.message || ""));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
                Import / Export Student Data
            </h2>

            <form onSubmit={handleImport} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Upload Excel File (.xlsx)
                    </label>
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {loading ? "Importing..." : "📥 Import Data"}
                </button>
            </form>

            <hr className="my-6" />

            <button
                onClick={handleExport}
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {loading ? "Exporting..." : "📤 Export Data"}
            </button>
        </div>
    );
};

export default ImportExport;
