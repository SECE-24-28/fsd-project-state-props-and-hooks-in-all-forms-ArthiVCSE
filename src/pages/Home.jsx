import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="🎓 Admissions Open 2026 - 2027 |" linkTo="/enquiry-form" linkText="Enquire now." />
      <Navbar />

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-left">
          <p className="breadcrumb">Home &gt; Welcome</p>
          <h1>Where <span>Tradition</span> Meets Modern Excellence</h1>
          <p className="hero-description">
            Experience a vibrant university environment powered by innovation, research excellence,
            industry-focused learning, and student success. Ashford University prepares future
            leaders for a rapidly evolving world.
          </p>
          <div className="hero-buttons">
            <Link to="/" className="hero-btn">🚀 Virtual Tour</Link>
            <Link to="/programmes" className="hero-btn">🎓 Explore Programmes</Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="notice-card"><h3>📅 Admission Deadline</h3><p>30 June 2026</p></div>
          <div className="notice-card"><h3>🎉 Next Event</h3><p>Tech Symposium - 20 Jun</p></div>
          <div className="notice-card"><h3>📚 Timetable Published</h3><p>Jun - Nov 2026</p></div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        {[['24K+','STUDENTS'],['20+','PROGRAMMES'],['95%','PLACEMENTS'],['22+','RESEARCH CENTRES'],['4.5★','STUDENT RATING']].map(([v,l]) => (
          <div className="stats-item" key={l}><h1>{v}</h1><p>{l}</p></div>
        ))}
      </section>

      {/* PORTALS */}
      <section className="portal-main">
        <div className="side-image"><img src="/images/left.jpg" alt="Campus" /></div>
        <section className="portal-section">
          <div className="portal-card">
            <h2>🎓 STUDENT</h2><p>Attendance, results and courses</p><br />
            <Link to="/student-dashboard" className="hero-btn">Open Portal</Link>
          </div>
          <div className="portal-card">
            <h2>🛡️ ADMIN</h2><p>University management dashboard</p><br />
            <Link to="/admin-dashboard" className="hero-btn">Open Dashboard</Link>
          </div>
          <div className="portal-card">
            <h2>👨‍🏫 FACULTY</h2><p>Staff info &amp; Student reports</p><br />
            <Link to="/faculty-dashboard" className="hero-btn">Open Panel</Link>
          </div>
        </section>
        <div className="side-image"><img src="/images/right.jpg" alt="University" /></div>
      </section>

      {/* FEATURE */}
      <section className="feature-section">
        <div className="feature-box">
          <div className="feature-box-top">
            <h2>🏫 INDOOR CAMPUS MAP</h2>
            <a href="/images/campus-map.png" target="_blank" rel="noreferrer">Open full map →</a>
          </div>
          <div className="feature-content green-box">
            <img src="/images/campus-map.png" alt="Campus Map"
              style={{ width:'100%', objectFit:'cover', borderRadius:'12px' }} />
            <p>Explore departments, labs, classrooms and libraries through our campus map.</p>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-box-top">
            <h2>📍 HOW TO REACH US</h2>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer">Get directions →</a>
          </div>
          <div className="feature-content blue-box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2502.9875403709943!2d0.8712722765984767!3d51.14558087173325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47deda457ad5808d%3A0xf3d93c8ea73600!2sEKC%20Ashford%20College!5e0!3m2!1sen!2sin!4v1779977500644!5m2!1sen!2sin"
              width="85%" height="373px"
              style={{ border:0, borderRadius:'12px', display:'block', margin:'auto' }}
              allowFullScreen loading="lazy" title="Campus Map"
            />
            <p style={{ marginTop:'12px' }}>Ashford University Campus · Smart Navigation · Visitor Access</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;