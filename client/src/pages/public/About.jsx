import "./About.css";
import { Link } from "react-router-dom";
import { FaBullseye, FaEye, FaAward, FaUserGraduate } from "react-icons/fa";
import aboutImg from "../../assets/about.png";

function About() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="container text-center">
          <span className="eyebrow eyebrow-center">The Institute</span>
          <h1>Building the people behind the progress</h1>
          <p>
            Quality education, practical learning, and industry-oriented
            training — since day one.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src={aboutImg}
                alt="Sky Institute campus"
                className="about-photo"
              />
            </div>

            <div className="col-lg-6">
              <span className="eyebrow">Who we are</span>
              <h2>Education built around what employers actually need</h2>

              <p>
                Sky Institute is committed to delivering quality education
                with modern teaching methods. We focus on practical learning,
                industry exposure, and overall student development.
              </p>

              <p>
                We offer career-oriented courses designed to prepare students
                for real-world challenges and professional success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="about-card">
                <FaBullseye />
                <h3>Mission</h3>
                <p>
                  Deliver quality education that empowers students with
                  technical knowledge and practical skills.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card">
                <FaEye />
                <h3>Vision</h3>
                <p>
                  Become a leading institute known for academic excellence,
                  innovation, and student success.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card">
                <FaAward />
                <h3>Quality</h3>
                <p>
                  Maintain high academic standards with experienced faculty,
                  practical training, and continuous improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3">
              <h2>2,000+</h2>
              <p>Students</p>
            </div>
            <div className="col-md-3">
              <h2>25+</h2>
              <p>Courses</p>
            </div>
            <div className="col-md-3">
              <h2>40+</h2>
              <p>Faculty</p>
            </div>
            <div className="col-md-3">
              <h2>95%</h2>
              <p>Success rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container text-center">
          <FaUserGraduate className="graduate-icon" />
          <h2>Join Sky Institute today</h2>
          <p>Learn from experienced faculty and build a successful career.</p>
          <Link to="/admissions" className="btn-cta-accent">
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}

export default About;
