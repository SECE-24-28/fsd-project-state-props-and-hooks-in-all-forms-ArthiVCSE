import React from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import InfoIcon from '@mui/icons-material/Info';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function About() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><InfoIcon fontSize="small"/> About Ashford University</span>} />
      <Navbar />

      <section className="container my-3 flex-grow-1">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h1 className="mb-4">Excellence in <span style={{ color:'#A84B2F' }}>Education</span></h1>
            <p className="text-secondary lh-lg">
             Ashford University was established in 1892 with a mission to provide world-class education and modern
             learning opportunities for students across the globe.

            Our university combines tradition, innovation, research, and smart campus technology to create future leaders.

With a strong focus on academic excellence, industry collaboration, and practical learning, Ashford University empowers students to develop the knowledge, skills, and confidence needed to thrive in a rapidly changing world. Our experienced faculty, state-of-the-art facilities, and student-centered approach create an inspiring environment where creativity, critical thinking, and lifelong learning flourish.

Through diverse programs, cutting-edge research initiatives, and global partnerships, we prepare graduates to become innovators, entrepreneurs, and responsible citizens who make meaningful contributions to society. At Ashford University, education goes beyond the classroom—it's a transformative journey toward personal growth, professional success, and leadership excellence.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <img src="/images/bg.jpg" className="img-fluid rounded shadow" alt="University"/>
          </div>
        </div>
      </section>

      <section className="container mb-5">
        <div className="row g-4">
          {[
            { icon: <TrackChangesIcon fontSize="large" color="primary" />, title:'Our Mission',   text:'To empower students with knowledge, leadership, and innovation.' },
            { icon: <PublicIcon fontSize="large" color="primary" />, title:'Our Vision',    text:'To become a globally respected institution for academic excellence.' },
            { icon: <EmojiEventsIcon fontSize="large" color="primary" />, title:'Achievements',  text:'Ranked among top universities with excellent placement records.' },
          ].map(({ icon, title, text }) => (
            <div className="col-md-4" key={title}>
              <div className="card h-100 shadow border-0 rounded-4 p-3">
                <div className="card-body text-center">
                  <h2 className="card-title d-flex align-items-center justify-content-center gap-2 mb-3">{icon} {title}</h2>
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