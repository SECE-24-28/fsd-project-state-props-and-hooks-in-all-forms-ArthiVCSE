import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@ford\.edu\.in$/;

function ForgotPassword() {
  const [form, setForm]     = useState({ email:'', reason:'' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email)                     errs.email  = 'Email is required';
    else if (!EMAIL_RE.test(form.email)) errs.email  = 'Use university mail id (@ford.edu.in)';
    if (!form.reason)                    errs.reason = 'Please enter reason';
    setErrors(errs);

    if (!Object.keys(errs).length) {
      const requests = JSON.parse(localStorage.getItem('resetRequests')) || [];
      requests.push({ email: form.email, reason: form.reason, status: 'Pending' });
      localStorage.setItem('resetRequests', JSON.stringify(requests));
      alert('Password reset request sent to Admin for approval.');
      setForm({ email:'', reason:'' });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="🔒 Reset Your Password" />
      <Navbar />
      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-center mb-4">Forgot Password</h2>
              <p className="text-center text-muted mb-4">
                Submit a password reset request. It will be reviewed by the administrator.
              </p>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">University Email</label>
                  <input type="email" className="form-control" placeholder="example@ford.edu.in"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Reason for Password Reset</label>
                  <textarea className="form-control" rows="3" placeholder="Enter reason"
                    value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} />
                  {errors.reason && <small className="text-danger">{errors.reason}</small>}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Send Request</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <Link to="/login" className="text-decoration-none">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-bottom">© 2026 Ashford University · All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default ForgotPassword;