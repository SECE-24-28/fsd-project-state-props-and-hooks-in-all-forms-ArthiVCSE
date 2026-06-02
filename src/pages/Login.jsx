import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';

const EMAIL_RE    = /^[a-zA-Z0-9._%+-]+@ford\.edu\.in$/;
const PASSWORD_RE = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
const ROUTES      = { Student:'/student-dashboard', Faculty:'/faculty-dashboard', Admin:'/admin-dashboard' };

function Login() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ role:'', email:'', password:'' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.role)                        errs.role     = 'Please select your role';
    if (!form.email)                       errs.email    = 'Email is required';
    else if (!EMAIL_RE.test(form.email))   errs.email    = 'Use university mail id (@ford.edu.in)';
    if (!form.password)                    errs.password = 'Password is required';
    else if (!PASSWORD_RE.test(form.password)) errs.password = 'Password must contain 1 capital letter and 1 number';
    setErrors(errs);

    if (!Object.keys(errs).length) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user  = users.find(u => u.officialEmail === form.email && u.password === form.password && u.role === form.role);
      localStorage.setItem('universityEmail', form.email);
      localStorage.setItem('userRole', form.role);
      if (user) localStorage.setItem('loggedInUser', JSON.stringify(user));
      sessionStorage.setItem('loginStatus', 'Logged In');
      alert('Login Successful!');
      navigate(ROUTES[form.role] || '/');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message="🎓 Ashford University Portal Login" />
      <Navbar />
      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card shadow border-0 rounded-4 p-3">
              <h2 className="text-center mb-3">🔐 Portal Login</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Select Role</label>
                  <select className="form-select" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                    <option value="">Choose Role</option>
                    <option>Student</option><option>Faculty</option><option>Admin</option>
                  </select>
                  {errors.role && <small className="text-danger">{errors.role}</small>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Username / Email</label>
                  <input type="email" className="form-control" placeholder="example@ford.edu.in"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Enter Password"
                    value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
              <div className="text-center mt-2">
                <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
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

export default Login;