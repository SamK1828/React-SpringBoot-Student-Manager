// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import About from "./pages/About";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import ImportExport from "./pages/ImportExport";
const App = () => {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        {/* Navbar Always Visible */}
        <Navbar />

        {/* Main Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/about" element={<About/>} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/edit-student/:id" element={<EditStudent />} />
            <Route path="*" element={<h2 className="text-center text-2xl mt-10">404 - Page Not Found</h2>} />
            <Route path="/import-export" element={<ImportExport />} />
          </Routes>
          
        </div>
        <ToastContainer position="top-center" autoClose={3000} />
        <Footer/>
      </div>
      
    </Router>
    
  );
};

export default App;
