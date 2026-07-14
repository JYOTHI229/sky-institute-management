import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/studentService";
import { useToast } from "../../context/ToastContext";
import Loader from "../../components/common/Loader";
import "./Profile.css";

function Profile() {
  const toast = useToast();
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile({ name: data.name, email: data.email });
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load your profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await updateProfile(profile);
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating profile.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <p>Manage your account details</p>

      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
