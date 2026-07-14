import "./Home.css";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import heroImg from "../../assets/hero.png";
import aboutImg from "../../assets/about.png";

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="eyebrow">Sky Institute · Est. Admissions Open</span>

              <h1 className="hero-title">
                Learn today.
                <br />
                <span className="hero-title-accent">Lead tomorrow.</span>
              </h1>

              <p className="hero-copy">
                Sky Institute helps students manage admissions, courses and
                academic progress through one modern, secure platform —
                built for the whole journey from application to graduation.
              </p>

              <div className="hero-buttons">
                <Link to="/courses" className="btn-solid">
                  Explore Courses
                </Link>

                <Link to="/admissions" className="btn-outline-brand">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-visual">
                <img src={heroImg} alt="Students at Sky Institute" className="hero-image" />

                <div className="hero-ticket ticket">
                  <div className="hero-ticket-row">
                    <span className="ticket-meta">Admission status</span>
                    <span className="hero-ticket-code">SKY // 2026</span>
                  </div>
                  <div className="ticket-stub-divider" />
                  <div className="hero-ticket-row hero-ticket-bottom">
                    <div>
                      <span className="ticket-meta">Applicant</span>
                      <strong>You, hopefully</strong>
                    </div>
                    <div className="hero-ticket-status">Boarding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="stat-card">
                <FaUserGraduate />
                <h2>2,000+</h2>
                <p>Students</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card">
                <FaBookOpen />
                <h2>25+</h2>
                <p>Courses</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card">
                <FaChalkboardTeacher />
                <h2>40+</h2>
                <p>Faculty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about-home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src={aboutImg}
                alt="About Sky Institute"
                className="about-image"
              />
            </div>

            <div className="col-lg-6">
              <span className="eyebrow">Why Sky Institute</span>
              <h2>Built for the whole climb, not just the landing</h2>

              <p>
                We pair industry-oriented education with experienced faculty,
                practical learning and career guidance — and a platform that
                keeps every step of admissions, coursework and progress in
                one place.
              </p>

              <ul className="about-list">
                <li><span className="about-list-mark" />Experienced faculty</li>
                <li><span className="about-list-mark" />Practical, hands-on learning</li>
                <li><span className="about-list-mark" />Placement assistance</li>
                <li><span className="about-list-mark" />Modern infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container text-center">
          <span className="eyebrow eyebrow-light">Admissions are open</span>
          <h2>Start your learning journey today</h2>
          <p>Enroll now and build your future with Sky Institute.</p>
          <Link to="/register" className="btn-cta-accent">
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
