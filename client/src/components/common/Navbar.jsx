import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="custom-navbar">
      <div className="container nav-inner">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <img src={logo} className="logo" alt="Sky Institute logo" />
            <div className="brand">
            <h4>Sky Institute</h4>
            <span>Management System</span>
          </div>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-collapse ${open ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className="nav-link" onClick={closeMenu} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses" className="nav-link" onClick={closeMenu}>
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/admissions" className="nav-link" onClick={closeMenu}>
                Admissions
              </NavLink>
            </li>
          </ul>

          <div className="nav-actions">
            {user ? (
              <>
                <Link to={user.role === "admin" ? "/admin" : "/student"} onClick={closeMenu}>
                  <Button variant="secondary" size="sm">Dashboard</Button>
                </Link>
                <Button variant="primary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <Button variant="accent" size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
