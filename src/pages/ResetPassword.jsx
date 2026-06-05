import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedEmail, apiGetUserRequests, apiResetPwd } from '../utils/storage';

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';

function ResetPassword() {
  const navigate = useNavigate();

  const [approved, setApproved]   = useState(false);
  const [form, setForm]           = useState({ newPassword:'', confirmPassword:'' });
  const [errors, setErrors]       = useState({});
  const [showPwd, setShowPwd]     = useState(false);
  const [showCPwd, setShowCPwd]   = useState(false);
  const [strength, setStrength]   = useState('');
  const [loading, setLoading]     = useState(false);

  const loggedEmail = getLoggedEmail();

  useEffect(() => {
    // Check if admin approved this user's request
    const checkApproval = async () => {
      try {
        const res = await apiGetUserRequests(loggedEmail);
        const approvedReq = res.data.find(r => r.status === 'Approved');
        if (approvedReq || sessionStorage.getItem('resetApproved') === 'true') {
          setApproved(true);
        }
      } catch (err) {
        console.error('Error checking reset approval:', err);
      }
    };
    if (loggedEmail) checkApproval();
  }, [loggedEmail]);

  const checkStrength = (pwd) => {
    if (pwd.length === 0)   { setStrength(''); return; }
    if (pwd.length < 6)     { setStrength('Weak'); return; }
    const hasUpper  = /[A-Z]/.test(pwd);
    const hasNum    = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
    if (hasUpper && hasNum && hasSymbol && pwd.length >= 10) { setStrength('Strong'); return; }
    if (hasUpper && hasNum) { setStrength('Medium'); return; }
    setStrength('Weak');
  };

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
    if (field === 'newPassword') checkStrength(value);
  };

  const validate = () => {
    const errs = {};
    if (!form.newPassword)
      errs.newPassword = 'New password is required.';
    else if (form.newPassword.length < 6)
      errs.newPassword = 'Password must be at least 6 characters.';
    else if (!/[A-Z]/.test(form.newPassword))
      errs.newPassword = 'Password must contain at least 1 uppercase letter.';
    else if (!/[0-9]/.test(form.newPassword))
      errs.newPassword = 'Password must contain at least 1 number.';
    if (!form.confirmPassword)
      errs.confirmPassword = 'Please confirm your password.';
    else if (form.newPassword !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await apiResetPwd({ email: loggedEmail, newPassword: form.newPassword });
      // Clear approval flag
      sessionStorage.removeItem('resetApproved');
      alert('Password updated successfully! Please login again.');
      navigate('/login');
    } catch (err) {
      setErrors({ form: err.message || 'Failed to reset password.' });
    } finally {
      setLoading(false);
    }
  };

  const strengthColor = {
    Weak  : 'text-danger',
    Medium: 'text-warning',
    Strong: 'text-success',
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background:'#F3ECE2' }}>
      <div className="top-bar text-center d-flex align-items-center justify-content-center gap-2"><VpnKeyIcon fontSize="small"/> Reset Password</div>

      <nav className="navbar border-bottom bg-light">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="logo-box me-3">A</div>
            <div className="logo-text">
              <h1 className="m-0">Ashford University</h1>
              <p className="m-0">Password Recovery</p>
            </div>
          </div>
          <Link to="/login" className="btn btn-outline-primary">← Back to Login</Link>
        </div>
      </nav>

      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow border-0 rounded-4 p-4">
              <h3 className="text-center mb-4">Create New Password</h3>

              {errors.form && (
                <div className="alert alert-danger mb-4">{errors.form}</div>
              )}

              <div className={`alert ${approved ? 'alert-success' : 'alert-warning'} mb-4`}>
                {approved
                  ? <span className="d-flex align-items-center gap-2"><CheckCircleIcon fontSize="small"/> Admin has approved your request. You can now set a new password.</span>
                  : <span className="d-flex align-items-center gap-2"><AccessTimeIcon fontSize="small"/> Waiting for Admin approval. This page will unlock once approved.</span>}
              </div>

              <form onSubmit={handleSubmit} noValidate>

                <div className="mb-3">
                  <label className="form-label fw-semibold">New Password</label>
                  <div className="input-group">
                    <input
                      type={showPwd ? 'text' : 'password'}
                      className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                      placeholder="Min 6 chars, 1 uppercase, 1 number"
                      disabled={!approved}
                      value={form.newPassword}
                      onChange={e => set('newPassword', e.target.value)}
                    />
                    <button type="button" className="btn btn-outline-secondary d-flex align-items-center"
                      onClick={() => setShowPwd(s => !s)} disabled={!approved}>
                      {showPwd ? <VisibilityOffIcon fontSize="small"/> : <VisibilityIcon fontSize="small"/>}
                    </button>
                    {errors.newPassword && (
                      <div className="invalid-feedback">{errors.newPassword}</div>
                    )}
                  </div>
                  {strength && (
                    <small className={`fw-semibold ${strengthColor[strength]}`}>
                      Password Strength: {strength}
                    </small>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Confirm Password</label>
                  <div className="input-group">
                    <input
                      type={showCPwd ? 'text' : 'password'}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder="Re-enter new password"
                      disabled={!approved}
                      value={form.confirmPassword}
                      onChange={e => set('confirmPassword', e.target.value)}
                    />
                    <button type="button" className="btn btn-outline-secondary d-flex align-items-center"
                      onClick={() => setShowCPwd(s => !s)} disabled={!approved}>
                      {showCPwd ? <VisibilityOffIcon fontSize="small"/> : <VisibilityIcon fontSize="small"/>}
                    </button>
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>
                  {form.confirmPassword && form.newPassword === form.confirmPassword && (
                    <small className="text-success fw-semibold d-flex align-items-center gap-1"><CheckCircleIcon fontSize="small"/> Passwords match</small>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg d-flex justify-content-center align-items-center gap-2" disabled={!approved || loading}>
                    {loading ? 'Updating...' : <><LockIcon /> Update Password</>}
                  </button>
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