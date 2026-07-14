import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaBookOpen,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaSchool,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

import "./Sidebar.css";

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-circle">
          <FaSchool />
        </div>

        <div>
          <h4>Sky IMS</h4>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/admin" end className="menu-item">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/students" className="menu-item">
          <FaUserGraduate />
          <span>Students</span>
        </NavLink>

        <NavLink to="/admin/courses" className="menu-item">
          <FaBookOpen />
          <span>Courses</span>
        </NavLink>

        <NavLink to="/admin/admissions" className="menu-item">
          <FaClipboardList />
          <span>Admissions</span>
        </NavLink>

        <NavLink to="/admin/profile" className="menu-item">
          <FaUserCircle />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
