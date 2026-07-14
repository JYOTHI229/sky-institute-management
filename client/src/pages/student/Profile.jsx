import { useEffect, useState } from "react";
import { getProfile } from "../../services/studentService";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/common/Loader";
import "./Profile.css";

function Profile() {
  const toast = useToast();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load your profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="card">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>
    </div>
  );
}

export default Profile;
