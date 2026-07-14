import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses, getMyAdmissions } from "../../services/studentService";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/common/Loader";
import "./MyCourses.css";

function MyCourses() {
  const toast = useToast();
  const [courses, setCourses] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [courseData, admissionData] = await Promise.all([
        getMyCourses(),
        getMyAdmissions(),
      ]);
      setCourses(courseData);
      setAdmissions(admissionData);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load your courses.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  // Applications that aren't enrolled yet (still Pending, or Rejected) —
  // shown separately so a student can see where each application stands.
  const pendingOrRejected = admissions.filter((a) => a.status !== "Approved");

  return (
    <div className="my-courses">
      <h2>My Courses</h2>

      {courses.length === 0 ? (
        <p className="empty-state">
          You're not enrolled in any course yet. Once an admin approves one
          of your admission applications, it'll show up here.{" "}
          <Link to="/courses">Browse courses</Link> and apply if you haven't
          already.
        </p>
      ) : (
        <div className="grid">
          {courses.map((c) => (
            <div key={c._id} className="card">
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <span>{c.duration}</span>
            </div>
          ))}
        </div>
      )}

      {pendingOrRejected.length > 0 && (
        <>
          <h2 style={{ marginTop: "36px" }}>My Applications</h2>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrRejected.map((a) => (
                  <tr key={a._id}>
                    <td>{a.courseId?.name || "—"}</td>
                    <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`status ${a.status.toLowerCase()}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default MyCourses;
