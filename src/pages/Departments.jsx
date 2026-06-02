import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const departments = [
  {
    img:'/images/cse-dept.jpg',
    title:'💻 Computer Science Engineering',
    desc:'Focused on Artificial Intelligence, Data Science, Cyber Security, Full Stack Development and Cloud Computing.',
    facts:['12 Research Labs','85 Faculty Members','AI Innovation Centre'],
  },
  {
    img:'/images/it-dept.jpg',
    title:'⚙️ Information Technology',
    desc:'Advanced networking, database systems, software engineering, DevOps and enterprise application development.',
    facts:['8 Research Labs','65 Faculty Members','Cyber Security & Cloud Lab'],
  },
  {
    img:'/images/ece-dept.jpg',
    title:'📡 Electronics & Communication',
    desc:'Embedded Systems, Robotics, IoT, VLSI Design, Automation and Communication Technologies.',
    facts:['10 Research Labs','70 Faculty Members','IoT & Robotics Centre'],
  },
  {
    img:'/images/dept-mgnt.jpg',
    title:'📈 Management Studies',
    desc:'Business leadership, finance, marketing, HR, analytics and entrepreneurship.',
    facts:['5 Research Labs','45 Faculty Members','Business Incubation Centre'],
  },
];

const programmeTable = [
  ['Computer Science Engineering','B.Tech (CSE)','M.Tech (CSE)','PhD'],
  ['Information Technology',      'B.Tech (IT)', 'M.Tech (IT)', '—'],
  ['Electronics & Communication', 'B.Tech (ECE)','M.Tech (ECE)','—'],
  ['Management Studies',          'BBA',          'MBA',         '—'],
];

const research = [
  { icon:'🔬', title:'Advanced Labs',          desc:'Smart laboratories with modern research equipment' },
  { icon:'🌍', title:'International Projects', desc:'Global academic and research collaborations' },
  { icon:'📚', title:'Publications',           desc:'High-impact journals, patents and conferences' },
  { icon:'💡', title:'Innovation Centre',      desc:'Startup incubation and entrepreneurship support' },
];

function Departments() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="🏢 Explore Academic Departments & Research Centres" />
      <Navbar />

      {/* HERO */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="fw-bold mb-4">
              Academic Departments & Research Excellence
            </h1>
            <p className="text-secondary lh-lg">
              Ashford University consists of advanced academic departments focused on
              innovation, research, student development, and industry collaboration.
              <br /><br />
              Every department is equipped with modern laboratories, experienced faculty
              members, research centres, and smart learning facilities.
            </p>
            <Link to="/faculties" className="btn btn-primary rounded-pill px-4 py-2 mt-3">
              Meet Faculty Members
            </Link>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <img src="/images/departments-main.jpg" className="img-fluid rounded-4 shadow" alt="Departments" />
          </div>
        </div>
      </section>

      {/* DEPARTMENTS GRID */}
      <section className="container pb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">University Departments</h2>
          <p className="text-secondary">Academic divisions and innovation centres</p>
        </div>
        <div className="row g-4">
          {departments.map(({ img, title, desc, facts }) => (
            <div className="col-md-6 col-lg-3" key={title}>
              <div className="card border-0 shadow rounded-4 h-100">
                <img src={img} className="card-img-top" height="200" alt={title} />
                <div className="card-body">
                  <h4>{title}</h4>
                  <p className="text-secondary">{desc}</p>
                  <ul>{facts.map(f => <li key={f}>{f}</li>)}</ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMMES TABLE */}
      <section className="container pb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Programmes Offered by Department</h2>
          <p className="text-secondary">Industry-aligned degrees for a future-ready career</p>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow">
            <thead className="table-dark">
              <tr>
                <th>Department</th>
                <th>UG Programme</th>
                <th>PG Programme</th>
                <th>Research</th>
              </tr>
            </thead>
            <tbody>
              {programmeTable.map(([dept, ug, pg, res]) => (
                <tr key={dept}>
                  <td>{dept}</td><td>{ug}</td><td>{pg}</td><td>{res}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="container pb-5">
        <div className="card border-0 shadow rounded-4 p-5">
          <h2 className="fw-bold text-center mb-4">Research &amp; Innovation</h2>
          <div className="row text-center">
            {research.map(({ icon, title, desc }) => (
              <div className="col-md-3 mb-4" key={title}>
                <h5>{icon} {title}</h5>
                <p className="text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Departments;