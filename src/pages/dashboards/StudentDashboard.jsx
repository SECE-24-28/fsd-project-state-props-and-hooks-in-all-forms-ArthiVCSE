import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  apiGetStudentMarks, apiGetStudentAtt, apiGetUserRequests,
  getLoggedEmail, getLoggedUser, doLogout, getGrade,
} from '../../utils/storage';

import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';

function StudentDashboard() {
  const navigate    = useNavigate();
  const loggedEmail = getLoggedEmail();
  const loggedUser  = getLoggedUser();
  const name        = loggedUser.name || loggedEmail;

  const [tab, setTab]         = useState('profile');
  const [myMarks, setMyMarks] = useState([]);
  const [myAtt, setMyAtt]     = useState([]);
  const [attFilter, setAttFilter] = useState('');
  const [myReqs, setMyReqs]   = useState([]);

  const loadMarks = useCallback(async () => {
    try {
      const res = await apiGetStudentMarks(loggedEmail);
      setMyMarks(res.data);
    } catch (err) { console.error('Error loading marks:', err); }
  }, [loggedEmail]);

  const loadAtt = useCallback(async () => {
    try {
      const res = await apiGetStudentAtt(loggedEmail);
      setMyAtt(res.data);
    } catch (err) { console.error('Error loading attendance:', err); }
  }, [loggedEmail]);

  const loadReqs = useCallback(async () => {
    try {
      const res = await apiGetUserRequests(loggedEmail);
      setMyReqs(res.data);
    } catch (err) { console.error('Error loading requests:', err); }
  }, [loggedEmail]);

  useEffect(() => {
    if (tab === 'marks')      loadMarks();
    if (tab === 'attendance') loadAtt();
    if (tab === 'resetpwd')   loadReqs();
  }, [tab, loadMarks, loadAtt, loadReqs]);

  useEffect(() => { loadMarks(); loadAtt(); }, [loadMarks, loadAtt]);

  const totalScore = myMarks.reduce((s, m) => s + Number(m.total), 0);
  const attPresent = myAtt.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const attPct     = myAtt.length > 0
    ? Math.round((attPresent / myAtt.length) * 100)
    : null;

  const maxTotal = myMarks.length * 50;
  const grandPct = maxTotal > 0 ? Math.round((totalScore / maxTotal) * 100) : 0;
  const passed   = myMarks.filter(m => Number(m.total) >= 25).length;

  const attTotal  = myAtt.length;
  const attP      = myAtt.filter(a => a.status === 'Present').length;
  const attA      = myAtt.filter(a => a.status === 'Absent').length;
  const attL      = myAtt.filter(a => a.status === 'Late').length;
  const attPctTab = attTotal > 0 ? Math.round(((attP + attL) / attTotal) * 100) : 0;
  const filteredAtt = (attFilter ? myAtt.filter(a => a.status === attFilter) : myAtt)
    .slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  const profileFields = [
    ['Name',           loggedUser.name          || '—'],
    ['Roll / Email',   loggedEmail              || '—'],
    ['Department',     loggedUser.dept          || '—'],
    ['Programme',      loggedUser.prog          || '—'],
    ['Year',           loggedUser.year          || '—'],
    ['Personal Email', loggedUser.personalEmail || '—'],
  ];

  const lastReq    = myReqs[myReqs.length - 1];
  const isApproved = lastReq && lastReq.status === 'Approved';

  const handleLogout = () => { doLogout(); navigate('/login'); };

  const renderTabBtn = (id, label, IconComp) => (
    <li className="nav-item" key={id}>
      <button className={`nav-link d-flex align-items-center gap-1 ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
        <IconComp fontSize="small" />
        {label}
      </button>
    </li>
  );

  return (
    <div style={{ background:'#F3ECE2', minHeight:'100vh' }}>

      <div className="top-bar text-center d-flex justify-content-center align-items-center gap-2">
        <SchoolIcon /> Student Dashboard
      </div>

      <nav className="navbar navbar-expand-lg bg-light border-bottom">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="logo-box me-3">A</div>
            <div className="logo-text">
              <h1 className="m-0">Ashford University</h1>
              <p className="m-0">Student Portal</p>
            </div>
          </div>
          <div className="ms-auto d-flex align-items-center gap-3">
            <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize:'13px' }}>
              <SchoolIcon fontSize="small"/> <strong>{name}</strong>
            </span>
            <button className="btn btn-danger d-flex align-items-center gap-1" onClick={handleLogout}>
              <LogoutIcon fontSize="small"/> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">

        <div className="mb-4">
          <h3 className="mb-0">Welcome, {name} 👋</h3>
          <p className="text-muted">View your academic records, marks and attendance.</p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 stat-card blue p-3">
              <div className="stat-num text-primary">{totalScore}</div>
              <div className="text-muted">Total Marks (All Subjects)</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 stat-card green p-3">
              <div className="stat-num"
                style={{ color: attPct !== null ? (attPct >= 75 ? '#198754' : '#dc3545') : '#999', fontSize:'2.2rem', fontWeight:700 }}>
                {attPct !== null ? `${attPct}%` : '—'}
              </div>
              <div className="text-muted">Attendance %</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 stat-card orange p-3">
              <div className="stat-num text-warning">{myMarks.length}</div>
              <div className="text-muted">Subjects with Marks</div>
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs mb-4 fw-semibold border-0">
          {renderTabBtn('profile', 'My Profile', PersonIcon)}
          {renderTabBtn('marks', 'My Marks', AssessmentIcon)}
          {renderTabBtn('attendance', 'My Attendance', AssignmentIcon)}
          {renderTabBtn('resetpwd', 'Password Reset', VpnKeyIcon)}
        </ul>

        {/* ══ PROFILE TAB ══════════════════════════════════════════════ */}
        {tab === 'profile' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4 d-flex align-items-center gap-2">
              <PersonIcon /> Student Profile
            </div>
            <div className="card-body">
              <div className="row g-0">
                {profileFields.map(([label, value]) => (
                  <div className="col-md-6 profile-row px-2" key={label}>
                    <div className="profile-label">{label}</div>
                    <div className="profile-value">{value}</div>
                  </div>
                ))}
              </div>
              <div className="alert alert-info mt-3 mb-0" style={{ fontSize:'13px' }}>
                Profile details are managed by the Admin.
                Contact your administrator to update any information.
              </div>
            </div>
          </div>
        )}

        {/* ══ MARKS TAB ════════════════════════════════════════════════ */}
        {tab === 'marks' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-success text-white rounded-top-4 d-flex align-items-center gap-2">
              <AssessmentIcon /> My Marks &amp; Results
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Subject</th>
                      <th>Internal (25)</th>
                      <th>Assignment (25)</th>
                      <th>Total (50)</th>
                      <th>Grade</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myMarks.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-3">
                          No marks available yet. Check back after your faculty enters marks.
                        </td>
                      </tr>
                    ) : myMarks.map((m, i) => {
                      const { g, c } = getGrade(Number(m.total));
                      const pass     = Number(m.total) >= 25;
                      return (
                        <tr key={m._id || i}>
                          <td>{i + 1}</td>
                          <td><strong>{m.subject || '—'}</strong></td>
                          <td>{m.internal}</td>
                          <td>{m.assignment}</td>
                          <td><strong>{m.total}</strong></td>
                          <td><span className={`badge ${c}`}>{g}</span></td>
                          <td>
                            <span className={`badge ${pass ? 'bg-success' : 'bg-danger'}`}>
                              {pass ? 'Pass' : 'Fail'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* SUMMARY ROW */}
              {myMarks.length > 0 && (
                <div className="p-3 bg-light border-top">
                  <div className="row g-3 text-center">
                    <div className="col-md-3">
                      <div className="fw-bold text-primary" style={{ fontSize:'1.4rem' }}>{totalScore}</div>
                      <div className="text-muted small">Grand Total</div>
                    </div>
                    <div className="col-md-3">
                      <div className="fw-bold text-success" style={{ fontSize:'1.4rem' }}>{grandPct}%</div>
                      <div className="text-muted small">Overall Percentage</div>
                    </div>
                    <div className="col-md-3">
                      <div className="fw-bold text-warning" style={{ fontSize:'1.4rem' }}>{myMarks.length}</div>
                      <div className="text-muted small">Subjects</div>
                    </div>
                    <div className="col-md-3">
                      <div className="fw-bold" style={{ fontSize:'1.4rem' }}>{passed} / {myMarks.length}</div>
                      <div className="text-muted small">Subjects Passed</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ ATTENDANCE TAB ═══════════════════════════════════════════ */}
        {tab === 'attendance' && (
          <>
            {/* ATTENDANCE SUMMARY CARDS */}
            <div className="row g-3 mb-4">
              {[
                { label:'Total Classes', val:attTotal,          cls:'stat-card green',  col:'text-success' },
                { label:'Present',       val:attP,              cls:'stat-card blue',   col:'text-primary' },
                { label:'Absent',        val:attA,              cls:'stat-card red',    col:'text-danger'  },
                { label:'Attendance %',  val:`${attPctTab}%`,   cls:'stat-card orange', col: attPctTab >= 75 ? 'text-success' : 'text-danger' },
              ].map(({ label, val, cls, col }) => (
                <div className="col-md-3" key={label}>
                  <div className={`card shadow-sm border-0 ${cls} p-3`}>
                    <div className={`stat-num ${col}`}>{val}</div>
                    <div className="text-muted d-flex align-items-center gap-1">
                      {label}
                      {label === 'Attendance %' && (
                        <span className={`badge ms-1 ${attPctTab >= 75 ? 'bg-success' : 'bg-danger'}`}>
                          {attPctTab >= 75 ? 'Safe' : 'Low'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ATTENDANCE TABLE */}
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-info text-white rounded-top-4 d-flex justify-content-between align-items-center">
                <span className="d-flex align-items-center gap-2"><AssignmentIcon /> Attendance Records</span>
                <select
                  className="form-select form-select-sm w-auto"
                  value={attFilter}
                  onChange={e => setAttFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr><th>#</th><th>Date</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {filteredAtt.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center text-muted py-3">
                            No attendance records yet.
                          </td>
                        </tr>
                      ) : filteredAtt.map((a, i) => {
                        const cls  = a.status === 'Present' ? 'att-present' : a.status === 'Absent' ? 'att-absent' : 'att-late';
                        const Icon = a.status === 'Present' ? CheckCircleIcon : a.status === 'Absent' ? CancelIcon : AccessTimeIcon;
                        return (
                          <tr key={a._id || i}>
                            <td>{i + 1}</td>
                            <td>{a.date}</td>
                            <td className={cls}><Icon fontSize="small" /> {a.status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══ PASSWORD RESET TAB ═══════════════════════════════════════ */}
        {tab === 'resetpwd' && (
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-warning rounded-top-4 d-flex align-items-center gap-2">
                  <VpnKeyIcon /> Password Reset Status
                </div>
                <div className="card-body">

                  <table className="table table-bordered mb-4">
                    <thead className="table-light">
                      <tr><th>#</th><th>Email</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {myReqs.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center text-muted py-2">
                            No reset requests submitted yet.
                          </td>
                        </tr>
                      ) : myReqs.map((r, i) => {
                        const badge = r.status === 'Approved'
                          ? 'bg-success' : r.status === 'Rejected'
                          ? 'bg-danger' : 'bg-warning text-dark';
                        const label = r.status === 'Approved'
                          ? 'Approved' : r.status === 'Rejected'
                          ? 'Rejected' : 'Pending';
                        return (
                          <tr key={r._id || i}>
                            <td>{i + 1}</td>
                            <td>{r.email}</td>
                            <td><span className={`badge ${badge}`}>{label}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className={`alert ${
                    !lastReq                        ? 'alert-secondary' :
                    lastReq.status === 'Pending'   ? 'alert-warning'   :
                    lastReq.status === 'Rejected'  ? 'alert-danger'    :
                                                     'alert-success'
                  }`}>
                    {!lastReq                       && 'No request found. Use the link below to submit one.'}
                    {lastReq?.status === 'Pending'  && 'Your request is pending — waiting for Admin approval. The Reset Password button will activate once approved.'}
                    {lastReq?.status === 'Rejected' && 'Your request was rejected by the Admin. Submit a new request if needed.'}
                    {lastReq?.status === 'Approved' && 'Your request has been approved! Click the button below to reset your password.'}
                  </div>

                  <div className="d-grid mt-3">
                    {isApproved
                      ? <Link to="/reset-password" className="btn btn-success btn-lg d-flex justify-content-center align-items-center gap-2"><LockIcon /> Reset Password</Link>
                      : <button className="btn btn-success btn-lg d-flex justify-content-center align-items-center gap-2" disabled><LockIcon /> Reset Password</button>
                    }
                  </div>

                  <p className="text-muted mt-2 mb-0" style={{ fontSize:'12px' }}>
                    Don't have a request yet?{' '}
                    <Link to="/forgot-password">Submit one here →</Link>
                  </p>

                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <footer className="footer mt-4">
        <div className="footer-bottom">© 2026 Ashford University · All Rights Reserved</div>
      </footer>

    </div>
  );
}

export default StudentDashboard;