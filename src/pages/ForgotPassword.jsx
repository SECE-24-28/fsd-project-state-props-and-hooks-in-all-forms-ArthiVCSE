import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';

import { validateUniversityEmail, apiCreateRequest } from '../utils/storage';

import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ForgotPassword() {
  const [form, setForm]       = useState({ email:'', reason:'' });
  const [errors, setErrors]   = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email)
      errs.email  = 'Email is required.';
    else if (!validateUniversityEmail(form.email))
      errs.email  = 'Must be a university email (@ford.edu.in).';
    if (!form.reason.trim() || form.reason.trim().length < 5)
      errs.reason = 'Please enter a reason (min 5 characters).';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await apiCreateRequest({ email: form.email, reason: form.reason });
      setSuccess(true);
      setForm({ email:'', reason:'' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setErrors({ form: err.message || 'Failed to submit request.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><LockIcon fontSize="small"/> Forgot Password</span>} />

      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-center mb-1">Forgot Password</h2>
              <p className="text-center text-muted mb-4" style={{ fontSize:'13px' }}>
                Submit a request. Admin will review and approve it.
                Once approved the Reset Password button will activate.
              </p>

              {errors.form && (
                <div className="alert alert-warning py-2">{errors.form}</div>
              )}

              {success && (
                <div className="alert alert-success">
                  <span className="d-flex align-items-center gap-2"><CheckCircleIcon fontSize="small"/> Request submitted! Please wait for Admin approval.</span>
                  <br />Check the Password Reset tab in your dashboard.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>

                <div className="mb-3">
                  <label className="form-label fw-semibold">University Email</label>
                  <input type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : form.email ? 'is-valid' : ''}`}
                    placeholder="example@ford.edu.in"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Reason for Reset</label>
                  <textarea rows="3"
                    className={`form-control ${errors.reason ? 'is-invalid' : form.reason ? 'is-valid' : ''}`}
                    placeholder="Briefly explain why you need a password reset"
                    value={form.reason} onChange={e => set('reason', e.target.value)} />
                  {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Send Request'}
                  </button>
                </div>

              </form>

              <div className="text-center mt-3">
                <Link to="/login" className="text-decoration-none" style={{ fontSize:'13px' }}>
                  ← Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;