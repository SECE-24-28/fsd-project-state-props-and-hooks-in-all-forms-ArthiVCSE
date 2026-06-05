import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import WorkIcon from '@mui/icons-material/Work';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ComputerIcon from '@mui/icons-material/Computer';
import MicIcon from '@mui/icons-material/Mic';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';

const placementStats = [
  { value:'95%',     label:'Overall Placement Rate' },
  { value:'250+',    label:'Recruiting Companies' },
  { value:'₹42 LPA', label:'Highest Package' },
  { value:'₹8.6 LPA',label:'Average Package' },
];

const companies = [
  { img:'/images/google.jpg',    name:'Google',    roles:'Software Engineering, AI & Cloud Roles' },
  { img:'/images/microsoft.jpg', name:'Microsoft', roles:'Full Stack & Data Engineering Roles' },
  { img:'/images/amazon.jpg',    name:'Amazon',    roles:'Cloud Computing & Operations' },
  { img:'/images/tcs.jpg',       name:'TCS',       roles:'Consulting & Software Development' },
  { img:'/images/infosys.jpg',   name:'Infosys',   roles:'Digital Transformation Services' },
  { img:'/images/accenture.jpg', name:'Accenture', roles:'Technology & Consulting Roles' },
  { img:'/images/wipro.jpg',     name:'Wipro',     roles:'IT Services & Cyber Security' },
  { img:'/images/deloitte.png',  name:'Deloitte',  roles:'Audit, Finance & Analytics Roles' },
];

const training = [
  { icon: <PsychologyIcon fontSize="large" color="primary" />, title:'Aptitude Training',  desc:'Quantitative, logical and reasoning practice' },
  { icon: <ComputerIcon fontSize="large" color="primary" />, title:'Technical Training', desc:'Coding, projects and domain skill enhancement' },
  { icon: <MicIcon fontSize="large" color="primary" />, title:'Mock Interviews',    desc:'HR and technical interview practice sessions' },
  { icon: <DescriptionIcon fontSize="large" color="primary" />, title:'Resume Building',    desc:'Professional profile development workshops' },
];

const stories = [
  { icon: <PersonIcon color="primary" />, name:'Priya Sharma',  role:'Software Engineer - Google',          degree:'B.Tech Computer Science Engineering',    quote:'Ashford University\'s placement training helped me secure my dream job at Google.' },
  { icon: <PersonIcon color="primary" />, name:'Arjun Mehta',   role:'Business Analyst - Deloitte',         degree:'Master of Business Administration (MBA)', quote:'Mock interviews and aptitude sessions boosted my confidence.' },
  { icon: <PersonIcon color="primary" />, name:'Karan Patel',   role:'Cloud Engineer - Amazon',             degree:'B.Tech Information Technology',          quote:'Industry-focused DevOps projects gave me the practical exposure for interviews.' },
  { icon: <PersonIcon color="primary" />, name:'Sneha Rajan',   role:'Embedded Systems Engineer - Wipro',   degree:'B.Tech Electronics & Communication',     quote:'The IoT and Robotics labs made me stand out during campus placements.' },
  { icon: <PersonIcon color="primary" />, name:'Divya Nair',    role:'Marketing Executive - Accenture',    degree:'Bachelor of Business Administration',    quote:'The corporate mentorship prepared me for a real-world marketing career.' },
  { icon: <PersonIcon color="primary" />, name:'Rahul Iyer',    role:'Data Scientist - Microsoft',          degree:'M.Tech Computer Science Engineering',    quote:'The AI curriculum gave me the foundation to excel at a global tech firm.' },
];

function Placements() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><WorkIcon fontSize="small"/> 95% Placement Record | Top Recruiters Visiting Campus</span>} />
      <Navbar />

      {/* HERO */}
      <section className="container py-3">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="fw-bold mb-4">Building Careers Through Excellence &amp; Innovation</h1>
            <p className="text-secondary lh-lg">
              Ashford University has consistently maintained excellent placement records with
              students securing positions in leading multinational companies, startups,
              research organizations, and government sectors.
              <br /><br />
              Our dedicated Placement &amp; Career Development Cell provides students with
              industry-focused training, aptitude preparation, mock interviews, technical
              workshops, resume building, and leadership development programs.
            </p>
            <div className="mt-4">
              <Link to="/contact" className="btn btn-primary rounded-pill px-4 py-2 me-3">
                Placement Office
              </Link>
              <a href="#companies" className="btn btn-outline-dark rounded-pill px-4 py-2">
                View Recruiters
              </a>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <img src="/images/placements.jpg" className="img-fluid rounded-4 shadow" alt="Placements" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container pb-5">
        <div className="row g-4 text-center">
          {placementStats.map(({ value, label }) => (
            <div className="col-md-3" key={label}>
              <div className="card border-0 shadow rounded-4 p-4">
                <h1 className="fw-bold text-primary">{value}</h1>
                <p className="text-secondary m-0">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPANIES */}
      <section className="container pb-5" id="companies">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Top Recruiting Companies</h2>
          <p className="text-secondary">Global brands hiring Ashford graduates</p>
        </div>
        <div className="row g-4">
          {companies.map(({ img, name, roles }) => (
            <div className="col-md-3" key={name}>
              <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
                <img src={img} height="70" className="mx-auto mb-3" alt={name} />
                <h5>{name}</h5>
                <p className="text-secondary">{roles}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRAINING */}
      <section className="container pb-5">
        <div className="card border-0 shadow rounded-4 p-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Placement Training Process</h2>
            <p className="text-secondary">Career preparation from first year onwards</p>
          </div>
          <div className="row text-center">
            {training.map(({ icon, title, desc }) => (
              <div className="col-md-3 mb-4" key={title}>
                <h5>{icon} {title}</h5>
                <p className="text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="container pb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Student Success Stories</h2>
        </div>
        <div className="row g-4">
          {stories.map(({ icon, name, role, degree, quote }) => (
            <div className="col-md-4" key={name}>
              <div className="card border-0 shadow rounded-4 p-4 h-100">
                <h5>{icon} {name}</h5>
                <p className="text-primary">{role}</p>
                <p className="text-muted small mb-1">{degree}</p>
                <p className="text-secondary">"{quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Placements;