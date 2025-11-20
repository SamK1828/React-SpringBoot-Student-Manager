// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Students from "./pages/Students";
// import AddStudent from "./pages/AddStudent";
// import EditStudent from "./pages/EditStudent";
// import About from "./pages/About";
// import Footer from "./components/Footer";
// import { ToastContainer } from "react-toastify";
// import ImportExport from "./pages/ImportExport";
// const App = () => {
//   return (
//     <Router>
//       <div className="bg-gray-50 min-h-screen">
//         {/* Navbar Always Visible */}
//         <Navbar />

//         {/* Main Content */}
//         <div className="p-6">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/students" element={<Students />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/add-student" element={<AddStudent />} />
//             <Route path="/edit-student/:id" element={<EditStudent />} />
//             <Route path="*" element={<h2 className="text-center text-2xl mt-10">404 - Page Not Found</h2>} />
//             <Route path="/import-export" element={<ImportExport />} />
//           </Routes>

//         </div>
//         <ToastContainer position="top-center" autoClose={3000} />
//         <Footer />
//       </div>

//     </Router>

//   );
// };

// export default App;


// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

// Pages
import Home from "./pages/Home";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import About from "./pages/About";
import ImportExport from "./pages/ImportExport";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-gray-50 min-h-screen">
          {/* Navbar Always Visible */}
          <Navbar />

          {/* Main Content */}
          <div className="p-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/students"
                element={
                  <ProtectedRoute>
                    <Students />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-student"
                element={
                  <ProtectedRoute>
                    <AddStudent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-student/:id"
                element={
                  <ProtectedRoute>
                    <EditStudent />
                  </ProtectedRoute>
                }
              />

              {/* Admin Only Route */}
              <Route
                path="/import-export"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <ImportExport />
                  </ProtectedRoute>
                }
              />

              {/* 404 - Page Not Found */}
              <Route
                path="*"
                element={
                  <h2 className="text-center text-2xl mt-10">
                    404 - Page Not Found
                  </h2>
                }
              />
            </Routes>
          </div>

          <ToastContainer position="top-center" autoClose={3000} />
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;