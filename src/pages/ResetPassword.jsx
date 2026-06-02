import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [approved, setApproved] = useState(false);
  const [form, setForm]         = useState({ newPassword:'', confirmPassword:'' });

  useEffect(() => {
    setApproved(sessionStorage.getItem('resetApproved') === 'true');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword.length < 6)            { alert('Password must be at least 6 characters.'); return; }
    if (form.newPassword !== form.confirmPassword) { alert('Passwords do not match.'); return; }
    localStorage.setItem('userPassword', form.newPassword);
    alert('Password Updated Successfully!');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background:'#F3ECE2' }}>
      <div className="top-bar text-center">🔑 Reset Password</div>
      <nav className="navbar border-bottom">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="logo-box me-3">A</div>
            <div className="logo-text">
              <h1 className="m-0">Ashford University</h1>
              <p className="m-0">Password Recovery</p>
            </div>
          </div>
          <Link to="/login" className="btn btn-primary">Back to Login</Link>
        </div>
      </nav>
      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow border-0 rounded-4 p-4">
              <h3 className="text-center mb-4">Create New Password</h3>
              <div className={`alert ${approved ? 'alert-success' : 'alert-warning'}`}>
                {approved ? 'Admin Approved Your Request ✔' : 'Waiting for Admin Approval...'}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-control" disabled={!approved}
                    value={form.newPassword} onChange={e => setForm({...form, newPassword: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" disabled={!approved}
                    value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success" disabled={!approved}>Update Password</button>
                </div>
              </form>
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

export default ResetPassword;