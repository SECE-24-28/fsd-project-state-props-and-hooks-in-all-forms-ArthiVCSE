import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const highlights = [
  { value:'20+',  label:'Industry Aligned Programmes' },
  { value:'95%',  label:'Placement Assistance' },
  { value:'50+',  label:'Modern Laboratories' },
  { value:'120+', label:'Recruiting Companies' },
];

const engProgrammes = [
  {
    img:'/images/cse.jpg',
    title:'Computer Science Engineering',
    desc:'Specializations in Artificial Intelligence, Data Science, Cyber Security, Full Stack Development and Cloud Computing.',
    points:['Smart Labs','Hackathons','Industry Projects','Internships'],
  },
  {
    img:'/images/it.jpg',
    title:'Information Technology',
    desc:'Advanced networking, database systems, software engineering, DevOps and enterprise application development.',
    points:['Cloud Computing','Networking Labs','Software Training','Placement Coaching'],
  },
  {
    img:'/images/ece.jpg',
    title:'Electronics & Communication',
    desc:'Embedded Systems, Robotics, IoT, VLSI Design, Automation and Communication Technologies.',
    points:['IoT Labs','Robotics Projects','Industrial Visits','Research Activities'],
  },
];

const mgmtProgrammes = [
  {
    img:'/images/bba.jpg',
    title:'Bachelor of Business Administration',
    desc:'Covers Finance, Marketing, Human Resource Management, Entrepreneurship and Business Communication.',
  },
  {
    img:'/images/mba.jpg',
    title:'Master of Business Administration',
    desc:'Advanced learning in Business Analytics, Operations, Strategic Management, Leadership and Innovation.',
  },
];

function Programmes() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="🎓 Engineering & Management Programmes" />
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
          {engProgrammes.map(({ img, title, desc, points }) => (
            <div className="col-lg-4" key={title}>
              <div className="card border-0 shadow h-100">
                <img src={img} className="card-img-top" alt={title} />
                <div className="card-body">
                  <h4 className="fw-bold">{title}</h4>
                  <p className="text-secondary">{desc}</p>
                  <ul className="text-secondary">
                    {points.map(p => <li key={p}>{p}</li>)}
                  </ul>
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
          {mgmtProgrammes.map(({ img, title, desc }) => (
            <div className="col-lg-6" key={title}>
              <div className="card border-0 shadow h-100">
                <img src={img} className="card-img-top" alt={title} />
                <div className="card-body">
                  <h4 className="fw-bold">{title}</h4>
                  <p className="text-secondary">{desc}</p>
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