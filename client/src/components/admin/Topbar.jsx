import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

function Topbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>Dashboard</h2>
        <p>{today}</p>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search students, courses..." />
        </div>

        <button className="icon-btn notification-btn" type="button">
          <FaBell />
        </button>

        <div className="profile-box" onClick={() => setMenuOpen((o) => !o)}>
          <FaUserCircle className="profile-icon" />
          <div>
            <h6>{user?.name || "Admin"}</h6>
            <span>Admin</span>
          </div>

          {menuOpen && (
            <div className="profile-menu">
              <button onClick={handleLogout} type="button">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
