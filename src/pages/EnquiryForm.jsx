import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EMAIL_RE = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;
const PHONE_RE = /^[0-9]{10}$/;

function EnquiryForm() {
  const [form, setForm]     = useState({ name:'', email:'', phone:'', message:'' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name)                      errs.name    = 'Full name is required';
    if (!form.email)                     errs.email   = 'Email is required';
    else if (!EMAIL_RE.test(form.email)) errs.email   = 'Use valid email id';
    if (!form.phone)                     errs.phone   = 'Phone number is required';
    else if (!PHONE_RE.test(form.phone)) errs.phone   = 'Enter valid 10 digit phone number';
    if (!form.message)                   errs.message = 'Please enter your query';
    setErrors(errs);

    if (!Object.keys(errs).length) {
      localStorage.setItem('studentEnquiry', JSON.stringify({ fullName:form.name, email:form.email, phone:form.phone, query:form.message }));
      sessionStorage.setItem('latestEnquiryUser', form.name);
      alert('Enquiry Submitted Successfully!');
      setForm({ name:'', email:'', phone:'', message:'' });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="📝 Admission Enquiry" />
      <Navbar />
      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-center mb-4">Enquiry Form</h2>
              <form onSubmit={handleSubmit} noValidate>
                {[
                  { name:'name',  label:'Full Name',     type:'text',  ph:'Enter Full Name' },
                  { name:'email', label:'Email Address', type:'email', ph:'example@gmail.com' },
                  { name:'phone', label:'Phone Number',  type:'text',  ph:'Enter Phone Number' },
                ].map(({ name, label, type, ph }) => (
                  <div className="mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input type={type} className="form-control" placeholder={ph}
                      value={form[name]} onChange={e => setForm({...form, [name]: e.target.value})} />
                    {errors[name] && <small className="text-danger">{errors[name]}</small>}
                  </div>
                ))}
                <div className="mb-3">
                  <label className="form-label">Your Query</label>
                  <textarea rows="5" className="form-control" placeholder="Enter Your Query"
                    value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  {errors.message && <small className="text-danger">{errors.message}</small>}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Submit Enquiry</button>
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