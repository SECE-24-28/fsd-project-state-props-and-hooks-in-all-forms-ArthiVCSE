import React from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="ℹ️ About Ashford University" />
      <Navbar />

      <section className="container my-5 flex-grow-1">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h1 className="mb-4">Excellence in <span style={{ color:'#A84B2F' }}>Education</span></h1>
            <p className="text-secondary lh-lg">
              Ashford University was established in 1892 with a mission to provide world-class
              education and modern learning opportunities for students across the globe.
              <br /><br />
              Our university combines tradition, innovation, research, and smart campus
              technology to create future leaders.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <img src="/images/bg.jpg" className="img-fluid rounded shadow" alt="University" />
          </div>
        </div>
      </section>

      <section className="container mb-5">
        <div className="row g-4">
          {[
            { icon:'🎯', title:'Our Mission',   text:'To empower students with knowledge, leadership, and innovation.' },
            { icon:'🌍', title:'Our Vision',    text:'To become a globally respected institution for academic excellence.' },
            { icon:'🏆', title:'Achievements',  text:'Ranked among top universities with excellent placement records.' },
          ].map(({ icon, title, text }) => (
            <div className="col-md-4" key={title}>
              <div className="card h-100 shadow border-0 rounded-4 p-3">
                <div className="card-body text-center">
                  <h2 className="card-title mb-3">{icon} {title}</h2>
                  <p className="card-text text-secondary">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;