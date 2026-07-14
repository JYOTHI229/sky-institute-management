import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addCourse } from "../../services/courseService";
import { useToast } from "../../context/ToastContext";
import "./AdminForm.css";

function AddCourse() {
  const navigate = useNavigate();
  const toast = useToast();

  const [course, setCourse] = useState({
    name: "",
    description: "",
    duration: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addCourse(course);
      toast.success("Course added successfully.");
      navigate("/admin/courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding course.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-form-page">
      <div className="admin-form-card">
        <div className="admin-form-header">
          <h2>Add Course</h2>
          <Link to="/admin/courses" className="admin-form-back">
            &larr; Back to Courses
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Course name
            <input
              type="text"
              name="name"
              value={course.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              rows={4}
            />
          </label>

          <label>
            Duration
            <input
              type="text"
              name="duration"
              placeholder="e.g. 6 months"
              value={course.duration}
              onChange={handleChange}
              required
            />
          </label>

          <button className="admin-form-submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
