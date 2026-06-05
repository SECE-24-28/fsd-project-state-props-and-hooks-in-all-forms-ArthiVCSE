import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { apiGetUsers } from '../utils/storage';

import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PublicIcon from '@mui/icons-material/Public';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const stats = [
  { value:'50',   label:'Faculty Members' },
  { value:'90%+', label:'PhD Holders' },
  { value:'100+', label:'Research Publications' },
  { value:'50+',  label:'International Collaborations' },
];

const distribution = [
  ['Computer Science Engineering','12','8','B.Tech (CSE), M.Tech, PhD'],
  ['Information Technology',       '10','5','B.Tech (IT), M.Tech'],
  ['Electronics & Communication',  '8', '9','B.Tech (ECE), M.Tech'],
  ['Management Studies',           '12','6','BBA, MBA'],
];

const features = [
  { icon: <MenuBookIcon fontSize="large" color="primary" />, title:'Research Guidance',    desc:'Support for projects, patents and publications' },
  { icon: <LaptopMacIcon fontSize="large" color="primary" />, title:'Industry Training',    desc:'Real-world technical and industrial exposure' },
  { icon: <PublicIcon fontSize="large" color="primary" />, title:'Global Collaboration', desc:'International seminars, exchange and workshops' },
  { icon: <TrackChangesIcon fontSize="large" color="primary" />, title:'Student Mentorship',   desc:'Academic counselling and career guidance support' },
];

function Faculties() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await apiGetUsers('Faculty');
        // Filter users who are faculty and have profile data set
        // (If not set, we can show them anyway with default fallbacks)
        setMembers(res.data);
      } catch (err) {
        console.error('Failed to load faculties:', err);
      }
    };
    fetchFaculties();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><SchoolIcon fontSize="small"/> Meet Our Experienced Faculty Members & Academic Leaders</span>} />
      <Navbar />

      {/* HERO */}
      <section className="container py-3">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="fw-bold mb-4">World-Class Faculty &amp; Academic Mentors</h1>
            <p className="text-secondary lh-lg">
              Ashford University is proud to have highly qualified faculty members with expertise
              Computer Science, Information Technology, Electronics &amp; Communication, and Management Studies. 
              Our professors, researchers, and mentors focus on delivering industry oriented
              education, innovative research, practical training, and academic excellence.
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

      {/* FACULTY MEMBERS (DYNAMIC) */}
      <section className="container pb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Meet Our Faculty Leaders</h2>
          <p className="text-secondary">Experienced educators and researchers</p>
        </div>
        <div className="row g-4">
          {members.length === 0 ? (
            <div className="col-12 text-center text-muted py-5">
              No faculty profiles have been added yet. Administrators can add faculty from the Admin Dashboard.
            </div>
          ) : members.map((f) => (
            <div className="col-md-6 col-lg-3" key={f._id}>
              <div className="card border-0 shadow rounded-4 h-100">
                {f.profileImg ? (
                  <img src={f.profileImg} className="card-img-top" height="300" style={{ objectFit: 'cover' }} alt={f.name} />
                ) : (
                  <div className="bg-light text-center d-flex align-items-center justify-content-center" style={{ height:'300px' }}>
                    <h1 className="text-muted m-0">{f.name.charAt(0)}</h1>
                  </div>
                )}
                <div className="card-body">
                  <h5>{f.name}</h5>
                  <p className="text-primary">{f.designation || 'Faculty Member'}</p>
                  <p className="text-secondary" style={{ fontSize: '14px' }}>
                    {f.description || `Faculty member in the ${f.dept || 'University'} department.`}
                  </p>
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