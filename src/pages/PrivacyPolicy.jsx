import React from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LockIcon from '@mui/icons-material/Lock';

function PrivacyPolicy() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><LockIcon fontSize="small"/> Privacy Policy</span>} />
      <Navbar />
      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0 rounded-4 p-5">
              <h2 className="text-center mb-4">Privacy Policy</h2>
              <p className="text-secondary lh-lg">
                Ashford University values and protects all user data and privacy.<br /><br />
                Information collected through forms, portals, admissions, and academic systems
                will only be used for educational and administrative purposes.<br /><br />
                We do not share personal information with third parties without permission,
                except where required by law.<br /><br />
                All student, faculty, and university data is securely maintained within the
                university management system using protected technologies.<br /><br />
                Users are responsible for maintaining the confidentiality of their login
                credentials and portal access information.<br /><br />
                By using the university website and portals, users agree to follow all
                university privacy and data protection policies.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;