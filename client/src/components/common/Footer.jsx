import "./Footer.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-4">
            <div className="footer-brand">
              <img src={logo} alt="Sky Institute logo" className="footer-logo" />
              <div>
                <h4>Sky Institute</h4>
                <p>Management System</p>
              </div>
            </div>

            <p className="footer-text">
              Empowering education through technology. Manage admissions,
              courses, students and academic activities on one secure,
              modern platform.
            </p>
          </div>

          <div className="col-lg-2">
            <h5>Explore</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/admissions">Admissions</Link></li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h5>For Students</h5>
            <ul>
              <li><Link to="/register">Create Account</Link></li>
              <li><Link to="/login">Student Login</Link></li>
              <li><Link to="/admissions">Apply Now</Link></li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h5>Contact</h5>
            <p><FaEnvelope /> info@skyinstitute.com</p>
            <p><FaPhone /> +91 98765 43210</p>
            <p><FaMapMarkerAlt /> Hyderabad, India</p>
          </div>
        </div>

        <hr />

        <div className="copyright">
          © {new Date().getFullYear()} Sky Institute Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
