import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../../services/courseService";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="courses-page">
      <div className="container">
        <div className="courses-header">
          <h1>Our Courses</h1>
          <p>
            Choose from our industry-oriented programs designed to help
            you build a successful career.
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search Course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <h4 className="text-center mt-5">Loading Courses...</h4>
        ) : error ? (
          <h5 className="text-center mt-5">
            Couldn't load courses right now. Please try again later.
          </h5>
        ) : (
          <div className="row">
            {filteredCourses.length === 0 ? (
              <h5 className="text-center mt-5">No Courses Found</h5>
            ) : (
              filteredCourses.map((course) => (
                <div className="col-lg-4 col-md-6 mb-4" key={course._id}>
                  <div className="ticket course-ticket">
                    <div className="course-ticket-top">
                      <span className="ticket-meta">Program</span>
                      <span className="course-ticket-code">
                        SKY // {course.duration?.toUpperCase()}
                      </span>
                    </div>

                    <h3>{course.name}</h3>
                    <p>{course.description}</p>

                    <div className="ticket-stub-divider" />

                    <div className="course-ticket-bottom">
                      <div>
                        <span className="ticket-meta">Duration</span>
                        <strong>{course.duration}</strong>
                      </div>

                      <Link to="/admissions" className="apply-btn">
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Courses;
