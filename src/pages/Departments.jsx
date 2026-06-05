import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { apiGetDepartments } from '../utils/storage';

import BusinessIcon from '@mui/icons-material/Business';
import ScienceIcon from '@mui/icons-material/Science';
import PublicIcon from '@mui/icons-material/Public';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const research = [
  { icon: <ScienceIcon fontSize="large" color="primary" />, title:'Advanced Labs',          desc:'Smart laboratories with modern research equipment' },
  { icon: <PublicIcon fontSize="large" color="primary" />, title:'International Projects', desc:'Global academic and research collaborations' },
  { icon: <MenuBookIcon fontSize="large" color="primary" />, title:'Publications',           desc:'High-impact journals, patents and conferences' },
  { icon: <LightbulbIcon fontSize="large" color="primary" />, title:'Innovation Centre',      desc:'Startup incubation and entrepreneurship support' },
];

function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await apiGetDepartments();
        setDepartments(res);
      } catch (err) { console.error('Failed to load departments', err); }
    };
    fetchDepts();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><BusinessIcon fontSize="small"/> Explore Academic Departments & Research Centres</span>} />
      <Navbar />

      {/* HERO */}
      <section className="container py-3">
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
          {departments.length === 0 ? (
            <div className="col-12 text-center text-muted py-4">No departments listed yet.</div>
          ) : departments.map(({ _id, img, title, desc, facts }) => (
            <div className="col-md-6 col-lg-3" key={_id}>
              <div className="card border-0 shadow rounded-4 h-100">
                {img ? <img src={img} className="card-img-top" height="200" style={{objectFit:'cover'}} alt={title} /> : <div className="bg-light w-100" style={{height:'200px'}}></div>}
                <div className="card-body">
                  <h4>{title}</h4>
                  <p className="text-secondary">{desc}</p>
                  {facts && facts.length > 0 && (
                    <ul>{facts.map((f, i) => <li key={i}>{f}</li>)}</ul>
                  )}
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
              {departments.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-3">No data available</td></tr>
              ) : departments.map(({ _id, title, ug, pg, research }) => (
                <tr key={_id}>
                  <td><strong>{title}</strong></td>
                  <td>{ug || '—'}</td>
                  <td>{pg || '—'}</td>
                  <td>{research || '—'}</td>
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