import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses, getMyAdmissions } from "../../services/studentService";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/common/Loader";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [courses, setCourses] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
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
      setPendingCount(
        admissionData.filter((a) => a.status === "Pending").length
      );
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load your dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      <p>Welcome back, {user?.name || "Student"} 👋</p>

      <div className="cards">
        <div className="card">
          <h3>{courses.length}</h3>
          <p>Enrolled Courses</p>
        </div>

        <div className="card">
          <h3>{pendingCount}</h3>
          <p>Pending Applications</p>
        </div>

        <Link to="/student/courses" className="card link-card">
          <h3>→</h3>
          <p>My Courses</p>
        </Link>

        <Link to="/student/profile" className="card link-card">
          <h3>→</h3>
          <p>My Profile</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
