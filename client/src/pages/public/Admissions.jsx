import { useEffect, useState } from "react";
import { getCourses } from "../../services/courseService";
import { createAdmission } from "../../services/admissionService";
import { useToast } from "../../context/ToastContext";
import "./Admissions.css";

function Admissions() {
  const toast = useToast();

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load courses. Please refresh the page.");
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createAdmission(formData);

      toast.success("Admission application submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        courseId: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="admission-page">
      <div className="container">
        <div className="admission-layout">
          <div className="admission-intro">
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Apply now
            </span>
            <h2>Book your seat</h2>
            <p>
              Fill in the form below and our admissions team will follow up
              with next steps.
            </p>
          </div>

          <div className="ticket admission-card">
            <form onSubmit={handleSubmit}>
              <div className="admission-row">
                <label>
                  Full name
                  <input
                    type="text"
                    name="name"
                    placeholder="Jordan Rivera"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Phone number
                  <input
                    type="text"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Course
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                  disabled={loadingCourses}
                >
                  <option value="">
                    {loadingCourses ? "Loading courses..." : "Select a course"}
                  </option>

                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="ticket-stub-divider" />

              <button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admissions;
