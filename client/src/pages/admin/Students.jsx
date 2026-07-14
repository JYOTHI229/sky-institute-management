import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudents, deleteStudent } from "../../services/studentService";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/common/Loader";
import "./Students.css";

function Students() {
  const toast = useToast();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load students.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      await deleteStudent(id);
      toast.success("Student deleted successfully.");
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete student.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="students-page">
      <div className="students-header">
        <div>
          <h2>Students</h2>
          <p>Manage all registered students</p>
        </div>

        <Link className="add-btn" to="/admin/add-student">
          + Add Student
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-card">
        {filteredStudents.length === 0 ? (
          <p className="empty-state">No students found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.role}</td>
                  <td>
                    <Link
                      className="edit-btn"
                      to={`/admin/edit-student/${student._id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(student._id)}
                      disabled={deletingId === student._id}
                    >
                      {deletingId === student._id ? "Deleting..." : "Delete"}
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

export default Students;
