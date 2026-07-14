import { useEffect, useState } from "react";
import {
  getAdmissions,
  updateAdmission,
  deleteAdmission,
} from "../../services/admissionService";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/common/Loader";
import "./Admissions.css";

function Admissions() {
  const toast = useToast();
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const data = await getAdmissions();
      setAdmissions(data);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load admissions.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setBusyId(id);
    try {
      const updated = await updateAdmission(id, { status });
      setAdmissions((prev) => prev.map((a) => (a._id === id ? updated : a)));
      toast.success(`Admission ${status.toLowerCase()}.`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't update status.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this admission request?")) return;

    setBusyId(id);
    try {
      await deleteAdmission(id);
      setAdmissions((prev) => prev.filter((a) => a._id !== id));
      toast.success("Admission deleted.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete admission.");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admissions-page">
      <h2>Admissions</h2>
      <p>Manage student admission requests</p>

      <div className="table-card">
        {admissions.length === 0 ? (
          <p className="empty-state">No admission requests yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {admissions.map((a) => (
                <tr key={a._id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.phone}</td>
                  <td>{a.courseId?.name || "—"}</td>
                  <td>
                    <span className={`status ${a.status.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="approve"
                      onClick={() => updateStatus(a._id, "Approved")}
                      disabled={busyId === a._id || a.status === "Approved"}
                    >
                      Approve
                    </button>

                    <button
                      className="reject"
                      onClick={() => updateStatus(a._id, "Rejected")}
                      disabled={busyId === a._id || a.status === "Rejected"}
                    >
                      Reject
                    </button>

                    <button
                      className="delete"
                      onClick={() => handleDelete(a._id)}
                      disabled={busyId === a._id}
                    >
                      Delete
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

export default Admissions;
