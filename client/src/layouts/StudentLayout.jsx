import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBookOpen, FaTachometerAlt, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import "./StudentLayout.css";

function StudentLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="student-shell">
      <header className="student-topbar">
        <div className="container student-topbar-inner">
          <div className="student-brand">
            <img src={logo} alt="Sky Institute logo" />
            <span>Sky Institute</span>
          </div>

          <nav className="student-nav">
            <NavLink to="/student" end className="student-nav-link">
              <FaTachometerAlt /> Dashboard
            </NavLink>
            <NavLink to="/student/courses" className="student-nav-link">
              <FaBookOpen /> Courses
            </NavLink>
            <NavLink to="/student/profile" className="student-nav-link">
              <FaUserCircle /> Profile
            </NavLink>
          </nav>

          <div className="student-user">
            <span>{user?.name || "Student"}</span>
            <button onClick={handleLogout} aria-label="Logout">
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </header>

      <main className="student-main">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;
