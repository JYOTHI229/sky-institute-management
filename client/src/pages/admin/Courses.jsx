import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "../../services/courseService";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/common/Loader";
import "./Courses.css";

function Courses() {
  const toast = useToast();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      await deleteCourse(id);
      toast.success("Course deleted successfully.");
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete course.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="courses-page">
      <div className="courses-header">
        <div>
          <h2>Courses</h2>
          <p>Manage all available courses</p>
        </div>

        <Link className="add-btn" to="/admin/add-course">
          + Add Course
        </Link>
      </div>

      <div className="table-card">
        {courses.length === 0 ? (
          <p className="empty-state">No courses yet. Add your first course.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>{course.duration}</td>
                  <td>
                    <Link
                      className="edit-btn"
                      to={`/admin/edit-course/${course._id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(course._id)}
                      disabled={deletingId === course._id}
                    >
                      {deletingId === course._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Courses;
