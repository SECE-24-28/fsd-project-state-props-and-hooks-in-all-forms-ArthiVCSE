import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const highlights = [
  { img:'/images/room.jpg',        title:'🛏️ Modern Rooms',      desc:'Spacious rooms with beds, study tables, wardrobes, fans, and attached facilities.' },
  { img:'/images/dining.jpg',      title:'🍽️ Dining Facilities', desc:'Healthy and hygienic meals prepared with balanced nutrition and quality standards.' },
  { img:'/images/secured.jpg',     title:'🔐 24×7 Security',     desc:'CCTV monitoring, biometric entry systems, and hostel wardens ensure student safety.' },
  { img:'/images/campus-life.jpg', title:'🌳 Campus Life',       desc:'Sports areas, recreation zones, reading halls, and green surroundings for students.' },
];

const facilities = [
  '📶 High-Speed Wi-Fi',
  '⚽ Sports Facilities',
  '🧺 Laundry Services',
  '🏥 Medical Support',
  '📚 Study Halls',
  '🚌 Transport Access',
  '☕ Cafeteria',
  '🔋 Power Backup',
];

function Hostel() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="🏨 Safe • Smart • Comfortable Student Living" />
      <Navbar />

      {/* HERO */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="fw-bold mb-4">Premium Hostel &amp; Student Accommodation</h1>
            <p className="text-secondary lh-lg">
              Ashford University provides modern, safe, and student-friendly hostel
              facilities designed to create a comfortable living and learning environment.
              <br /><br />
              Our hostels include high-speed Wi-Fi, furnished rooms, hygienic dining,
              recreation centres, gym facilities, medical support, and 24×7 security.
              <br /><br />
              Separate hostels are available for boys and girls with wardens, biometric
              entry systems, CCTV surveillance, and smart campus access.
            </p>
            <div className="mt-4">
              <Link to="/contact" className="btn btn-primary rounded-pill px-4 py-2">
                Contact Warden
              </Link>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <img src="/images/hostel.jpg" className="img-fluid rounded-4 shadow" alt="Hostel" />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container pb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Hostel Highlights</h2>
          <p className="text-secondary">Smart facilities built for student comfort</p>
        </div>
        <div className="row g-4">
          {highlights.map(({ img, title, desc }) => (
            <div className="col-md-6 col-lg-3" key={title}>
              <div className="card border-0 shadow rounded-4 h-100">
                <img src={img} className="card-img-top" height="220" alt={title} />
                <div className="card-body">
                  <h5>{title}</h5>
                  <p className="text-secondary">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FACILITIES */}
      <section className="container pb-5">
        <div className="card border-0 shadow-lg rounded-4 p-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Facilities Available</h2>
            <p className="text-secondary">
              Designed to support academic and personal growth of students
            </p>
          </div>
          <div className="row text-center g-4">
            {facilities.map(f => (
              <div className="col-md-3" key={f}>
                <div className="p-4 bg-light rounded-4 shadow-sm h-100">
                  <h5>{f}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Hostel;