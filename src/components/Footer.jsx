import React from 'react';
import { Link } from 'react-router-dom';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h3>Ashford University</h3>
          <p>Empowering students with innovation, leadership, research and academic excellence since 1892.</p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/programmes">Programmes</Link></li>
            <li><Link to="/departments">Departments</Link></li>
            <li><Link to="/faculties">Faculties</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Student Services</h3>
          <ul>
            <li><Link to="/placements">Placements</Link></li>
            <li><Link to="/hostel">Hostel Facilities</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/enquiry-form">Enquiry Form</Link></li>
            <li><Link to="/login">Student Portal</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Policies &amp; Support</h3>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">Help &amp; FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>
            <span className="d-flex align-items-center gap-2"><LocationOnIcon fontSize="small"/> 25 University Road, London, United Kingdom</span><br />
            <span className="d-flex align-items-center gap-2"><PhoneIcon fontSize="small"/> 9876543210</span><br />
            <span className="d-flex align-items-center gap-2"><EmailIcon fontSize="small"/> info@ashforduniversity.edu</span>
          </p>
        </div>

      </div>
      <div className="footer-bottom">© 2026 Ashford University · All Rights Reserved</div>
    </footer>
  );
}

export default Footer;