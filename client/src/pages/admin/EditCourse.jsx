import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCourse, updateCourse } from "../../services/courseService";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/common/Loader";
import "./AdminForm.css";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [course, setCourse] = useState({
    name: "",
    description: "",
    duration: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const data = await getCourse(id);
      setCourse(data);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load this course.");
    } finally {
      setLoading(false);
    }
  };

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
      await updateCourse(id, course);
      toast.success("Course updated successfully.");
      navigate("/admin/courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating course.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-form-page">
      <div className="admin-form-card">
        <div className="admin-form-header">
          <h2>Edit Course</h2>
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
              value={course.duration}
              onChange={handleChange}
              required
            />
          </label>

          <button className="admin-form-submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
