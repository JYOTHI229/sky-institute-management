import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const toast = useToast();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await loginUser(form);
      const data = res.data;

      login(data);
      toast.success(`Welcome back, ${data.name}!`);

      navigate(data.role === "admin" ? "/admin" : "/student");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow eyebrow-light">Sky Institute</span>
        <h2 className="auth-panel-title">Welcome back to the journey.</h2>
        <p className="auth-panel-copy">
          Sign in to manage your admissions, courses and progress — wherever
          you left off.
        </p>

        <div className="ticket auth-ticket">
          <div className="hero-ticket-row">
            <span className="ticket-meta">Access</span>
            <span className="hero-ticket-code">SKY // LOGIN</span>
          </div>
          <div className="ticket-stub-divider" />
          <div className="hero-ticket-row hero-ticket-bottom">
            <div>
              <span className="ticket-meta">Gate</span>
              <strong>Student &amp; Admin</strong>
            </div>
            <div className="hero-ticket-status">Ready</div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h2>Login</h2>
          <p>Enter your details to access your dashboard.</p>

          <form onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" disabled={submitting}>
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
