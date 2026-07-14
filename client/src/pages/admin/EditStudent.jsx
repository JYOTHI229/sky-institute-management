import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getStudent,
  updateStudent,
  updateStudentRole,
} from "../../services/studentService";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/common/Loader";
import "./AdminForm.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const [student, setStudent] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [changingRole, setChangingRole] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const data = await getStudent(id);
      setStudent({ name: data.name, email: data.email, password: "" });
      setRole(data.role);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load this student.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = { name: student.name, email: student.email };
      if (student.password) payload.password = student.password;

      await updateStudent(id, payload);
      toast.success("Student updated successfully.");
      navigate("/admin/students");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (newRole) => {
    setChangingRole(true);
    try {
      await updateStudentRole(id, newRole);
      setRole(newRole);
      toast.success(
        newRole === "admin"
          ? "This user is now an admin."
          : "This user is now a student."
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't change role.");
    } finally {
      setChangingRole(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-form-page">
      <div className="admin-form-card">
        <div className="admin-form-header">
          <h2>Edit Student</h2>
          <Link to="/admin/students" className="admin-form-back">
            &larr; Back to Students
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            New password
            <input
              type="password"
              name="password"
              placeholder="Leave blank to keep current password"
              value={student.password}
              onChange={handleChange}
              minLength={6}
            />
            <span className="admin-form-hint">Optional — only fill this in to change it.</span>
          </label>

          <button className="admin-form-submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Student"}
          </button>
        </form>

        <div style={{ marginTop: "28px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
          <label>
            Account role
            <select
              value={role}
              disabled={changingRole || id === user?.id}
              onChange={(e) => handleRoleChange(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <span className="admin-form-hint">
            Admins can manage courses, students and admissions. Only promote
            people you trust with full access.
          </span>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
