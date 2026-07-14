import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useToast } from "../../context/ToastContext";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await registerUser(formData);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow eyebrow-light">Sky Institute</span>
        <h2 className="auth-panel-title">Your seat is one form away.</h2>
        <p className="auth-panel-copy">
          Create your student account to apply for courses and track your
          admission status.
        </p>

        <div className="ticket auth-ticket">
          <div className="hero-ticket-row">
            <span className="ticket-meta">New account</span>
            <span className="hero-ticket-code">SKY // JOIN</span>
          </div>
          <div className="ticket-stub-divider" />
          <div className="hero-ticket-row hero-ticket-bottom">
            <div>
              <span className="ticket-meta">Role</span>
              <strong>Student</strong>
            </div>
            <div className="hero-ticket-status">Open</div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h2>Create account</h2>
          <p>Student registration for Sky Institute.</p>

          <form onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                type="text"
                name="name"
                placeholder="Jordan Rivera"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </label>

            <button type="submit" disabled={submitting}>
              {submitting ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
