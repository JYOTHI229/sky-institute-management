import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addStudent } from "../../services/studentService";
import { useToast } from "../../context/ToastContext";
import "./AdminForm.css";

function AddStudent() {
  const navigate = useNavigate();
  const toast = useToast();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

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
      await addStudent(student);
      toast.success("Student added successfully.");
      navigate("/admin/students");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-form-page">
      <div className="admin-form-card">
        <div className="admin-form-header">
          <h2>Add Student</h2>
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
            Password
            <input
              type="password"
              name="password"
              value={student.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </label>

          <button className="admin-form-submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
