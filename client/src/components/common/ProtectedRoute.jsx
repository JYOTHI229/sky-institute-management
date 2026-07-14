import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!token || !user) return <Navigate to="/login" replace />;

  if (role && user?.role !== role) {
    // Logged in, but as the wrong role — send them to their own
    // dashboard instead of a public page that won't make sense.
    return <Navigate to={user?.role === "admin" ? "/admin" : "/student"} replace />;
  }

  return children;
}

export default ProtectedRoute;