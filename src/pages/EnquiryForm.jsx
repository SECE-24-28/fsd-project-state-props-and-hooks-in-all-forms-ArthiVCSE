import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { validateGeneralEmail, validatePhone, validateName, apiCreateEnquiry } from '../utils/storage';

import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function EnquiryForm() {
  const [form, setForm]       = useState({ name:'', email:'', phone:'', message:'' });
  const [errors, setErrors]   = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!validateName(form.name))
      errs.name    = 'Full name must be at least 2 characters.';
    if (!form.email)
      errs.email   = 'Email is required.';
    else if (!validateGeneralEmail(form.email))
      errs.email   = 'Enter a valid email address.';
    if (!form.phone)
      errs.phone   = 'Phone number is required.';
    else if (!validatePhone(form.phone))
      errs.phone   = 'Enter a valid 10-digit phone number.';
    if (!form.message.trim() || form.message.trim().length < 10)
      errs.message = 'Query must be at least 10 characters.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await apiCreateEnquiry({ name: form.name, email: form.email, phone: form.phone, message: form.message });

      // Also save latest to sessionStorage (for any frontend display needs)
      sessionStorage.setItem('latestEnquiryUser', form.name);
      sessionStorage.setItem('latestEnquiryEmail', form.email);

      setSuccess(true);
      setForm({ name:'', email:'', phone:'', message:'' });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setErrors({ form: err.message || 'Failed to submit enquiry.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><EditNoteIcon fontSize="small"/> Admission Enquiry</span>} />
      <Navbar />

      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-center mb-1">Enquiry Form</h2>
              <p className="text-center text-muted mb-4" style={{ fontSize:'13px' }}>
                Fill in your details and we'll get back to you within 24 hours.
              </p>

              {errors.form && (
                <div className="alert alert-danger">{errors.form}</div>
              )}

              {success && (
                <div className="alert alert-success d-flex align-items-center gap-2">
                  <CheckCircleIcon fontSize="small"/> Enquiry submitted successfully! We'll contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : form.name ? 'is-valid' : ''}`}
                    placeholder="Enter Your Full Name"
                    value={form.name} onChange={e => set('name', e.target.value)} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : form.email ? 'is-valid' : ''}`}
                    placeholder="example@gmail.com"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input type="text"
                    className={`form-control ${errors.phone ? 'is-invalid' : form.phone ? 'is-valid' : ''}`}
                    placeholder="10-digit phone number"
                    maxLength={10}
                    value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/g,''))} />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Query</label>
                  <textarea rows="5"
                    className={`form-control ${errors.message ? 'is-invalid' : form.message ? 'is-valid' : ''}`}
                    placeholder="Enter your query or question (min 10 characters)"
                    value={form.message} onChange={e => set('message', e.target.value)} />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  <small className="text-muted">{form.message.length} characters</small>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EnquiryForm;