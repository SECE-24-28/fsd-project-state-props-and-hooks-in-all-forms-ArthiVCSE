import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const stats = [
  { value:'50',   label:'Faculty Members' },
  { value:'90%+', label:'PhD Holders' },
  { value:'100+', label:'Research Publications' },
  { value:'50+',  label:'International Collaborations' },
];

const members = [
  { img:'/images/faculty1.jpg', name:'Dr. Michael Anderson', role:'Professor - Computer Science',         desc:'AI researcher with 15+ years of experience in Machine Learning, Data Science and Cloud Computing.' },
  { img:'/images/faculty2.jpg', name:'Dr. Sarah Johnson',    role:'Dean - Management Studies',            desc:'Expert in Business Analytics, Leadership and International Management.' },
  { img:'/images/faculty3.jpg', name:'Dr. Emily Carter',     role:'Professor - Electronics & Communication', desc:'Leading researcher in Embedded Systems, IoT and VLSI Design with 12+ years of experience.' },
  { img:'/images/faculty4.jpg', name:'Dr. Robert Williams',  role:'Head - Information Technology',        desc:'Specialist in Networking, Cyber Security, DevOps and Enterprise Software Development.' },
];

const distribution = [
  ['Computer Science Engineering','12','8','B.Tech (CSE), M.Tech, PhD'],
  ['Information Technology',       '10','5','B.Tech (IT), M.Tech'],
  ['Electronics & Communication',  '8', '9','B.Tech (ECE), M.Tech'],
  ['Management Studies',           '12','6','BBA, MBA'],
];

const features = [
  { icon:'📚', title:'Research Guidance',    desc:'Support for projects, patents and publications' },
  { icon:'💻', title:'Industry Training',    desc:'Real-world technical and industrial exposure' },
  { icon:'🌍', title:'Global Collaboration', desc:'International seminars, exchange and workshops' },
  { icon:'🎯', title:'Student Mentorship',   desc:'Academic counselling and career guidance support' },
];

function Faculties() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="👨‍🏫 Meet Our Experienced Faculty Members & Academic Leaders" />
      <Navbar />

      {/* HERO */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="fw-bold mb-4">World-Class Faculty &amp; Academic Mentors</h1>
            <p className="text-secondary lh-lg">
              Ashford University is proud to have highly qualified faculty members with expertise
              in Computer Science, Information Technology, Electronics &amp; Communication,
              and Management Studies.
              <br /><br />
              Our professors, researchers, and mentors focus on delivering industry-oriented
              education, innovative research, practical training, and academic excellence.
              <br /><br />
              Faculty members actively guide students in projects, internships, placements,
              entrepreneurship, research publications, and global competitions.
            </p>
            <div className="mt-4">
              <Link to="/departments" className="btn btn-primary rounded-pill px-4 py-2 me-3">
                Explore Departments
              </Link>
              <Link to="/contact" className="btn btn-outline-dark rounded-pill px-4 py-2">
                Contact Faculty Office
              </Link>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <img src="/images/faculties.jpg" className="img-fluid rounded-4 shadow" alt="Faculties" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container pb-5">
        <div className="row g-4 text-center">
          {stats.map(({ value, label }) => (
            <div className="col-md-3" key={label}>
              <div className="card border-0 shadow rounded-4 p-4">
                <h1 className="fw-bold text-primary">{value}</h1>
                <p className="text-secondary m-0">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FACULTY MEMBERS */}
      <section className="container pb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Meet Our Faculty Leaders</h2>
          <p className="text-secondary">Experienced educators and researchers</p>
        </div>
        <div className="row g-4">
          {members.map(({ img, name, role, desc }) => (
            <div className="col-md-6 col-lg-3" key={name}>
              <div className="card border-0 shadow rounded-4 h-100">
                <img src={img} className="card-img-top" height="300" alt={name} />
                <div className="card-body">
                  <h5>{name}</h5>
                  <p className="text-primary">{role}</p>
                  <p className="text-secondary">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACADEMIC FEATURES */}
      <section className="container pb-5">
        <div className="card border-0 shadow rounded-4 p-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Academic Excellence</h2>
            <p className="text-secondary">Faculty-driven innovation and student mentorship</p>
          </div>
          <div className="row text-center">
            {features.map(({ icon, title, desc }) => (
              <div className="col-md-3 mb-4" key={title}>
                <h5>{icon} {title}</h5>
                <p className="text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTRIBUTION TABLE */}
      <section className="container pb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Faculty Distribution by Department</h2>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow">
            <thead className="table-dark">
              <tr>
                <th>Department</th>
                <th>Faculty Count</th>
                <th>Research Labs</th>
                <th>Programmes Offered</th>
              </tr>
            </thead>
            <tbody>
              {distribution.map(([d, f, r, p]) => (
                <tr key={d}>
                  <td>{d}</td><td>{f}</td><td>{r}</td><td>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Faculties;