import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";
import DashboardCard from "../../components/admin/DashboardCard";
import Loader from "../../components/common/Loader";
import { useToast } from "../../context/ToastContext";
import {
  FaUserGraduate,
  FaBookOpen,
  FaClipboardList,
  FaHourglassHalf,
} from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const toast = useToast();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!stats) {
    return (
      <div className="dashboard-page">
        <p>Something went wrong loading the dashboard. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's an overview of your institute.</p>
      </div>

      <div className="dashboard-cards">
        <DashboardCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<FaUserGraduate />}
          color="blue"
        />
        <DashboardCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={<FaBookOpen />}
          color="green"
        />
        <DashboardCard
          title="Total Admissions"
          value={stats.totalAdmissions}
          icon={<FaClipboardList />}
          color="orange"
        />
        <DashboardCard
          title="Pending Admissions"
          value={stats.pendingAdmissions}
          icon={<FaHourglassHalf />}
          color="red"
        />
      </div>

      <div className="recent-section">
        <h3>Recent Admissions</h3>

        {stats.recentAdmissions.length === 0 ? (
          <p className="empty-state">No admissions yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {stats.recentAdmissions.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.courseId?.name || "—"}</td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
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

export default Dashboard;
