import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { validateUniversityEmail, validatePhone, apiCreateContact } from '../utils/storage';

import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

function Contact() {
  const [form, setForm]     = useState({ name:'', email:'', phone:'', message:'' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name    = 'Full name must be at least 2 characters.';
    if (!form.email)
      errs.email   = 'Email is required.';
    else if (!validateUniversityEmail(form.email))
      errs.email   = 'Must be a university email (@ford.edu.in).';
    if (!form.phone)
      errs.phone   = 'Phone number is required.';
    else if (!validatePhone(form.phone))
      errs.phone   = 'Enter a valid 10-digit phone number.';
    if (!form.message.trim() || form.message.trim().length < 10)
      errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await apiCreateContact({ name: form.name, email: form.email, phone: form.phone, message: form.message });
      setSuccess(true);
      setForm({ name:'', email:'', phone:'', message:'' });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setErrors({ form: err.message || 'Failed to send message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><PhoneIcon fontSize="small"/> Contact Ashford University</span>} />
      <Navbar />

      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-center mb-4">Contact Us</h2>

              {errors.form && (
                <div className="alert alert-danger">{errors.form}</div>
              )}

              {success && (
                <div className="alert alert-success d-flex align-items-center gap-2">
                  <CheckCircleIcon fontSize="small"/> Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : form.name ? 'is-valid' : ''}`}
                    placeholder="Enter Your Name"
                    value={form.name} onChange={e => set('name', e.target.value)} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">University Email</label>
                  <input type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : form.email ? 'is-valid' : ''}`}
                    placeholder="example@ford.edu.in"
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
                  <label className="form-label fw-semibold">Message</label>
                  <textarea rows="5"
                    className={`form-control ${errors.message ? 'is-invalid' : form.message ? 'is-valid' : ''}`}
                    placeholder="Enter your message (min 10 characters)"
                    value={form.message} onChange={e => set('message', e.target.value)} />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  <small className="text-muted">{form.message.length} characters</small>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <section className="container mb-5">
        <div className="row g-4">
          {[
            { icon: <LocationOnIcon fontSize="large" color="primary" />, title:'Address', text:'25 University Road, London, United Kingdom' },
            { icon: <EmailIcon fontSize="large" color="primary" />, title:'Email',   text:'info@ashforduniversity.edu' },
            { icon: <PhoneIcon fontSize="large" color="primary" />, title:'Phone',   text:'+44 9876543210' },
          ].map(({ icon, title, text }) => (
            <div className="col-md-4" key={title}>
              <div className="card h-100 shadow border-0 rounded-4 p-3 text-center">
                <h2 className="card-title d-flex justify-content-center align-items-center gap-2 mb-3">{icon} {title}</h2>
                <p className="card-text text-secondary">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;