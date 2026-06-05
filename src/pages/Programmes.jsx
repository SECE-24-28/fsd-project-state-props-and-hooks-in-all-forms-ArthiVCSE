import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { apiGetProgrammes } from '../utils/storage';
import SchoolIcon from '@mui/icons-material/School';

const highlights = [
  { value:'20+',  label:'Industry Aligned Programmes' },
  { value:'95%',  label:'Placement Assistance' },
  { value:'50+',  label:'Modern Laboratories' },
  { value:'120+', label:'Recruiting Companies' },
];

function Programmes() {
  const [engProgrammes, setEngProgrammes]   = useState([]);
  const [mgmtProgrammes, setMgmtProgrammes] = useState([]);

  useEffect(() => {
    const fetchProgs = async () => {
      try {
        const res = await apiGetProgrammes();
        const progs = res; // the API returns array directly
        setEngProgrammes(progs.filter(p => p.type === 'Engineering'));
        setMgmtProgrammes(progs.filter(p => p.type === 'Management'));
      } catch (err) { console.error('Failed to load programmes', err); }
    };
    fetchProgs();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><SchoolIcon fontSize="small"/> Engineering & Management Programmes</span>} />
      <Navbar />

      {/* HERO */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <p className="text-uppercase fw-bold" style={{ color:'#A84B2F', letterSpacing:'1px' }}>
              Academic Excellence
            </p>
            <h1 className="fw-bold mb-4" style={{ color:'#2E2C78', fontSize:'48px' }}>
              Future Ready Programmes
            </h1>
            <p className="text-secondary" style={{ lineHeight:'1.9' }}>
              Ashford University offers industry-focused Engineering and Management
              programmes designed to prepare students for global careers.
              <br /><br />
              Our curriculum combines innovation, practical learning, internships,
              industry projects, research opportunities and placement training.
              <br /><br />
              Students gain exposure to modern laboratories, startup incubation centres,
              coding clubs, management workshops and international certification courses.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <img src="/images/programmes.jpg" className="img-fluid rounded-4 shadow-lg" alt="Programmes" />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container py-4">
        <div className="row g-4">
          {highlights.map(({ value, label }) => (
            <div className="col-md-3" key={label}>
              <div className="card border-0 shadow-sm text-center p-4 h-100">
                <h2 style={{ color:'#2E2C78' }}>{value}</h2>
                <p className="text-secondary">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ENGINEERING */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color:'#2E2C78' }}>Engineering Programmes</h2>
          <p className="text-secondary">Technology driven programmes with practical learning experience.</p>
        </div>
        <div className="row g-4">
          {engProgrammes.length === 0 ? (
            <div className="col-12 text-center text-muted py-4">No engineering programmes listed yet.</div>
          ) : engProgrammes.map(({ _id, img, title, desc, points }) => (
            <div className="col-lg-4" key={_id}>
              <div className="card border-0 shadow h-100">
                {img ? <img src={img} className="card-img-top" alt={title} /> : <div className="bg-light w-100" style={{height:'200px'}}></div>}
                <div className="card-body">
                  <h4 className="fw-bold">{title}</h4>
                  <p className="text-secondary">{desc}</p>
                  {points && points.length > 0 && (
                    <ul className="text-secondary">
                      {points.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MANAGEMENT */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color:'#2E2C78' }}>Management Studies</h2>
          <p className="text-secondary">Leadership oriented programmes for future business professionals.</p>
        </div>
        <div className="row g-4">
          {mgmtProgrammes.length === 0 ? (
             <div className="col-12 text-center text-muted py-4">No management programmes listed yet.</div>
          ) : mgmtProgrammes.map(({ _id, img, title, desc, points }) => (
            <div className="col-lg-6" key={_id}>
              <div className="card border-0 shadow h-100">
                {img ? <img src={img} className="card-img-top" alt={title} /> : <div className="bg-light w-100" style={{height:'200px'}}></div>}
                <div className="card-body">
                  <h4 className="fw-bold">{title}</h4>
                  <p className="text-secondary">{desc}</p>
                  {points && points.length > 0 && (
                    <ul className="text-secondary">
                      {points.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="container py-5">
        <div className="card border-0 shadow-lg p-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src="/images/students.jpg" className="img-fluid rounded-4" alt="Students" />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4" style={{ color:'#2E2C78' }}>
                Why Choose Ashford University?
              </h2>
              <ul className="text-secondary" style={{ lineHeight:'2' }}>
                <li>Modern smart classrooms</li>
                <li>Industry certified courses</li>
                <li>Dedicated placement training</li>
                <li>Experienced faculty members</li>
                <li>Startup incubation support</li>
                <li>International collaborations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Programmes;