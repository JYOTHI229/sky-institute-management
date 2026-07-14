import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

// PUBLIC
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Courses from "./pages/public/Courses";
import Admissions from "./pages/public/Admissions";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import NotFound from "./pages/public/NotFound";

// ADMIN
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import AddStudent from "./pages/admin/AddStudent";
import EditStudent from "./pages/admin/EditStudent";
import AdminCourses from "./pages/admin/Courses";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";
import AdminAdmissions from "./pages/admin/Admissions";
import AdminProfile from "./pages/admin/Profile";

// STUDENT
import StudentDashboard from "./pages/student/Dashboard";
import MyCourses from "./pages/student/MyCourses";
import StudentProfile from "./pages/student/Profile";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* PUBLIC */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* ADMIN */}
            <Route
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/students" element={<Students />} />
              <Route path="/admin/add-student" element={<AddStudent />} />
              <Route path="/admin/edit-student/:id" element={<EditStudent />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/add-course" element={<AddCourse />} />
              <Route path="/admin/edit-course/:id" element={<EditCourse />} />
              <Route path="/admin/admissions" element={<AdminAdmissions />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </Route>

            {/* STUDENT */}
            <Route
              element={
                <ProtectedRoute role="student">
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/courses" element={<MyCourses />} />
              <Route path="/student/profile" element={<StudentProfile />} />
            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
