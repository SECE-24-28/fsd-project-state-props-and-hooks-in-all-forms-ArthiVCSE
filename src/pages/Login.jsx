import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

import {
  ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_ROLE,
  apiLogin, doLogin,
  validateUniversityEmail, validatePassword,
} from '../utils/storage';

import SchoolIcon from '@mui/icons-material/School';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ROUTES = {
  Student : '/student-dashboard',
  Faculty : '/faculty-dashboard',
  Admin   : '/admin-dashboard',
};

function Login() {
  const navigate = useNavigate();

  const [form, setForm]     = useState({ role:'', email:'', password:'' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.role)                              errs.role     = 'Please select your role.';
    if (!form.email)                             errs.email    = 'Email is required.';
    else if (!validateUniversityEmail(form.email)) errs.email  = 'Must be a university email (@ford.edu.in).';
    if (!form.password)                          errs.password = 'Password is required.';
    else if (!validatePassword(form.password))   errs.password = 'Min 6 characters, 1 uppercase, 1 number.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await apiLogin({ email: form.email, password: form.password, role: form.role });
      doLogin(res.data);
      navigate(ROUTES[form.role] || '/');
    } catch (err) {
      setErrors({ form: err.message || 'Invalid email, password or role. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><SchoolIcon fontSize="small"/> Ashford University Portal Login</span>} />
    

      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card shadow border-0 rounded-4 p-4">

              <h2 className="text-center mb-1 d-flex align-items-center justify-content-center gap-2" style={{ color:'#2E2C78' }}><LockIcon fontSize="large"/> Portal Login</h2>
              <p className="text-center text-muted mb-4" style={{ fontSize:'13px' }}>
                Select your role and enter your university credentials
              </p>

              {errors.form && (
                <div className="alert alert-danger py-2">{errors.form}</div>
              )}

              <form onSubmit={handleSubmit} noValidate>

                {/* ROLE */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Select Role</label>
                  <select
                    className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                    value={form.role}
                    onChange={e => set('role', e.target.value)}
                  >
                    <option value="">-- Choose Role --</option>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">University Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="example@ford.edu.in"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <input
                      type={showPwd ? 'text' : 'password'}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Enter Password"
                      value={form.password}
                      onChange={e => set('password', e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary d-flex align-items-center"
                      onClick={() => setShowPwd(s => !s)}
                    >
                      {showPwd ? <VisibilityOffIcon fontSize="small"/> : <VisibilityIcon fontSize="small"/>}
                    </button>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>

              </form>

              <div className="text-center mt-3">
                <Link to="/forgot-password" className="text-decoration-none" style={{ fontSize:'13px' }}>
                  Forgot Password?
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;