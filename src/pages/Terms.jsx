import React from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Terms() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="📜 Terms and Conditions" />
      <Navbar />
      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0 rounded-4 p-5">
              <h2 className="text-center mb-4">Terms &amp; Conditions</h2>
              <p className="text-secondary lh-lg">
                All students, faculty members, staff, and users must follow university policies,
                academic regulations, and portal usage rules.<br /><br />
                Users are responsible for maintaining the confidentiality of their login
                credentials and account information.<br /><br />
                Any misuse, unauthorized access, false information, or violation of university
                regulations may result in suspension of portal access.<br /><br />
                Ashford University reserves the right to update policies, academic rules, and
                portal terms whenever required.<br /><br />
                By accessing and using the university website and portals, users agree to comply
                with all terms and institutional guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;