import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@ford\.edu\.in$/;
const PHONE_RE = /^[0-9]{10}$/;

function Contact() {
  const [form, setForm]     = useState({ name:'', email:'', phone:'', message:'' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name)                    errs.name    = 'Name is required';
    if (!form.email)                   errs.email   = 'Email is required';
    else if (!EMAIL_RE.test(form.email)) errs.email = 'Use university mail id (@ford.edu.in)';
    if (!form.phone)                   errs.phone   = 'Phone number is required';
    else if (!PHONE_RE.test(form.phone)) errs.phone = 'Enter valid 10 digit phone number';
    if (!form.message)                 errs.message = 'Message is required';
    setErrors(errs);
    if (!Object.keys(errs).length) {
      alert('Message Sent Successfully!');
      setForm({ name:'', email:'', phone:'', message:'' });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="📞 Contact Ashford University" />
      <Navbar />

      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-center mb-4">Contact Us</h2>
              <form onSubmit={handleSubmit} noValidate>
                {[
                  { name:'name',    label:'Full Name',     type:'text',  placeholder:'Enter Your Name' },
                  { name:'email',   label:'Email Address', type:'email', placeholder:'example@ford.edu.in' },
                  { name:'phone',   label:'Phone Number',  type:'text',  placeholder:'Enter Phone Number' },
                ].map(({ name, label, type, placeholder }) => (
                  <div className="mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input type={type} className="form-control" placeholder={placeholder}
                      value={form[name]} onChange={(e) => setForm({...form, [name]: e.target.value})} />
                    {errors[name] && <small className="text-danger">{errors[name]}</small>}
                  </div>
                ))}
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea rows="5" className="form-control" placeholder="Enter Message"
                    value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} />
                  {errors.message && <small className="text-danger">{errors.message}</small>}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <section className="container mb-5">
        <div className="row g-4">
          {[
            { icon:'📍', title:'Address', text:'25 University Road, London, United Kingdom' },
            { icon:'✉️', title:'Email',   text:'info@ashforduniversity.edu' },
            { icon:'📞', title:'Phone',   text:'+44 9876543210' },
          ].map(({ icon, title, text }) => (
            <div className="col-md-4" key={title}>
              <div className="card h-100 shadow border-0 rounded-4 p-3">
                <div className="card-body text-center">
                  <h2 className="card-title mb-3">{icon} {title}</h2>
                  <p className="card-text text-secondary">{text}</p>
                </div>
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