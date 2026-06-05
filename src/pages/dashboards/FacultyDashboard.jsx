import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  apiGetUsers, apiGetAllMarks, apiUpsertMark, apiDeleteMark,
  apiGetAllAtt, apiUpsertAtt, apiDeleteAtt,
  apiGetUserRequests,
  getLoggedEmail, getLoggedUser, doLogout, getGrade,
} from '../../utils/storage';

import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockIcon from '@mui/icons-material/Lock';

const SUBJECTS = [
  'Machine Learning','Data Science','Computer Networks','Cloud Computing',
  'Cyber Security','AI Lab','Digital Electronics','Embedded Systems',
  'Business Analytics','Marketing Management',
];

const emptyMForm = { studentId:'', subject:'', internal:'', assignment:'' };
const emptyAForm = { student:'', date: new Date().toISOString().split('T')[0], status:'Present' };

function FacultyDashboard() {
  const navigate    = useNavigate();
  const loggedEmail = getLoggedEmail();
  const loggedUser  = getLoggedUser();
  const name        = loggedUser.name || loggedEmail;

  const [tab, setTab]           = useState('profile');
  const [students, setStudents] = useState([]);
  const [marks, setMarks]       = useState([]);
  const [att, setAtt]           = useState([]);
  const [myReqs, setMyReqs]     = useState([]);

  const [studentSearch, setStudentSearch] = useState('');
  const [marksSearch, setMarksSearch]     = useState('');

  const [mForm, setMForm] = useState(emptyMForm);
  const [mMsg,  setMMsg]  = useState({ text:'', type:'' });

  const [aForm, setAForm] = useState(emptyAForm);
  const [aMsg,  setAMsg]  = useState({ text:'', type:'' });

  const loadStudents = useCallback(async () => {
    try {
      const res = await apiGetUsers('Student');
      setStudents(res.data);
    } catch (err) { console.error('Error loading students:', err); }
  }, []);

  const loadMarks = useCallback(async () => {
    try {
      const res = await apiGetAllMarks();
      setMarks(res.data);
    } catch (err) { console.error('Error loading marks:', err); }
  }, []);

  const loadAtt = useCallback(async () => {
    try {
      const res = await apiGetAllAtt();
      setAtt(res.data);
    } catch (err) { console.error('Error loading attendance:', err); }
  }, []);

  const loadReqs = useCallback(async () => {
    try {
      const res = await apiGetUserRequests(loggedEmail);
      setMyReqs(res.data);
    } catch (err) { console.error('Error loading requests:', err); }
  }, [loggedEmail]);

  useEffect(() => { loadStudents(); loadMarks(); loadAtt(); }, [loadStudents, loadMarks, loadAtt]);

  useEffect(() => {
    if (tab === 'students')   loadStudents();
    if (tab === 'marks')      { loadStudents(); loadMarks(); }
    if (tab === 'attendance') { loadStudents(); loadAtt(); }
    if (tab === 'resetpwd')   loadReqs();
  }, [tab, loadStudents, loadMarks, loadAtt, loadReqs]);

  const studentCount = students.length;

  const submitMarks = async (e) => {
    e.preventDefault();
    const { studentId, subject, internal, assignment } = mForm;
    const int  = parseInt(internal);
    const asgn = parseInt(assignment);

    if (!studentId || !subject || isNaN(int) || isNaN(asgn)) {
      setMMsg({ text:'All fields are required.', type:'danger' }); return;
    }
    if (int < 0 || int > 25 || asgn < 0 || asgn > 25) {
      setMMsg({ text:'Marks must be between 0 and 25.', type:'danger' }); return;
    }

    try {
      await apiUpsertMark({ studentId, subject, internal: int, assignment: asgn });
      await loadMarks();
      setMForm(emptyMForm);
      setMMsg({ text:`Marks saved for ${studentId} — ${subject}.`, type:'success' });
      setTimeout(() => setMMsg({ text:'', type:'' }), 3000);
    } catch (err) {
      setMMsg({ text: err.message || 'Error saving marks.', type:'danger' });
    }
  };

  const deleteMark = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      await apiDeleteMark(id);
      await loadMarks();
    } catch (err) { console.error('Error deleting mark:', err); }
  };

  const submitAtt = async (e) => {
    e.preventDefault();
    const { student, date, status } = aForm;
    if (!student || !date) {
      setAMsg({ text:'Student and date are required.', type:'danger' }); return;
    }

    try {
      await apiUpsertAtt({ student, date, status });
      await loadAtt();
      setAForm(emptyAForm);
      setAMsg({ text:`${student} marked ${status} on ${date}.`, type:'success' });
      setTimeout(() => setAMsg({ text:'', type:'' }), 3000);
    } catch (err) {
      setAMsg({ text: err.message || 'Error saving attendance.', type:'danger' });
    }
  };

  const deleteAtt = async (id) => {
    try {
      await apiDeleteAtt(id);
      await loadAtt();
    } catch (err) { console.error('Error deleting attendance:', err); }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.officialEmail.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredMarks = marks.filter(m =>
    m.studentId.toLowerCase().includes(marksSearch.toLowerCase()) ||
    (m.subject || '').toLowerCase().includes(marksSearch.toLowerCase())
  );

  const sortedAtt = [...att].sort((a, b) => new Date(b.date) - new Date(a.date));

  const lastReq    = myReqs[myReqs.length - 1];
  const isApproved = lastReq && lastReq.status === 'Approved';

  const profileFields = [
    ['Name',          loggedUser.name  || '—'],
    ['Email',         loggedEmail      || '—'],
    ['Department',    loggedUser.dept  || '—'],
    ['Designation',   loggedUser.prog  || 'Faculty'],
    ['Qualification', loggedUser.qual  || '—'],
    ['Specialisation',loggedUser.spec  || '—'],
  ];

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
        <SchoolIcon /> Faculty Dashboard
      </div>

      <nav className="navbar navbar-expand-lg bg-light border-bottom">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="logo-box me-3">A</div>
            <div className="logo-text">
              <h1 className="m-0">Ashford University</h1>
              <p className="m-0">Faculty Portal</p>
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
          <h3 className="mb-0">Welcome, {name}</h3>
          <p className="text-muted">Manage student records, assign marks and attendance.</p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 stat-card blue p-3">
              <div className="stat-num text-primary">{studentCount}</div>
              <div className="text-muted">Total Students</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 stat-card green p-3">
              <div className="stat-num text-success">{marks.length}</div>
              <div className="text-muted">Marks Entered</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 stat-card orange p-3">
              <div className="stat-num text-warning">4</div>
              <div className="text-muted">Subjects</div>
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs mb-4 fw-semibold border-0">
          {renderTabBtn('profile', 'My Profile', PersonIcon)}
          {renderTabBtn('students', 'My Students', SchoolIcon)}
          {renderTabBtn('marks', 'Assign Marks', EditIcon)}
          {renderTabBtn('attendance', 'Attendance', AssignmentIcon)}
          {renderTabBtn('resetpwd', 'Password Reset', VpnKeyIcon)}
        </ul>

        {/* ══ PROFILE TAB ══════════════════════════════════════════════ */}
        {tab === 'profile' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4 d-flex align-items-center gap-2">
              <PersonIcon /> Faculty Profile
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

        {/* ══ STUDENTS TAB ═════════════════════════════════════════════ */}
        {tab === 'students' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center gap-2"><SchoolIcon /> Student Records</span>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search students..."
                style={{ width:'200px' }}
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
              />
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th><th>Name</th><th>Department</th>
                      <th>Programme</th><th>Year</th><th>Email</th><th>Marks Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-3">No students found</td>
                      </tr>
                    ) : filteredStudents.map((s, i) => {
                      const hasMark = marks.find(m => m.studentId === s.officialEmail);
                      return (
                        <tr key={s._id || i}>
                          <td>{i + 1}</td>
                          <td><strong>{s.name}</strong></td>
                          <td>{s.dept || '—'}</td>
                          <td>{s.prog || '—'}</td>
                          <td>{s.year || '—'}</td>
                          <td>{s.officialEmail}</td>
                          <td>
                            <span className={`badge ${hasMark ? 'bg-success' : 'bg-secondary'}`}>
                              {hasMark ? 'Entered' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ ASSIGN MARKS TAB ═════════════════════════════════════════ */}
        {tab === 'marks' && (
          <>
            {/* MARKS FORM */}
            <div className="card shadow-sm border-0 rounded-4 mb-4">
              <div className="card-header bg-success text-white rounded-top-4 d-flex align-items-center gap-2">
                <EditIcon /> Assign Marks
              </div>
              <div className="card-body">
                <form onSubmit={submitMarks} className="row g-3">

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Student Email</label>
                    <input
                      type="text" className="form-control"
                      placeholder="student@ford.edu.in"
                      list="studentDatalist"
                      value={mForm.studentId}
                      onChange={e => setMForm({...mForm, studentId: e.target.value})}
                    />
                    <datalist id="studentDatalist">
                      {students.map(s => (
                        <option key={s.officialEmail} value={s.officialEmail}>{s.name}</option>
                      ))}
                    </datalist>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Subject</label>
                    <select className="form-select"
                      value={mForm.subject}
                      onChange={e => setMForm({...mForm, subject: e.target.value})}>
                      <option value="">Select Subject</option>
                      {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label className="form-label fw-semibold">Internal (max 25)</label>
                    <input type="number" className="form-control" min="0" max="25" placeholder="0–25"
                      value={mForm.internal}
                      onChange={e => setMForm({...mForm, internal: e.target.value})} />
                  </div>

                  <div className="col-md-2">
                    <label className="form-label fw-semibold">Assignment (max 25)</label>
                    <input type="number" className="form-control" min="0" max="25" placeholder="0–25"
                      value={mForm.assignment}
                      onChange={e => setMForm({...mForm, assignment: e.target.value})} />
                  </div>

                  <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-1"><SaveIcon fontSize="small"/> Save</button>
                  </div>

                </form>
                {mMsg.text && (
                  <div className={`alert alert-${mMsg.type} mt-3 mb-0`}>{mMsg.text}</div>
                )}
              </div>
            </div>

            {/* MARKS TABLE */}
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <strong className="d-flex align-items-center gap-2"><AssessmentIcon /> Entered Marks</strong>
                <input type="text" className="form-control form-control-sm"
                  placeholder="Filter..." style={{ width:'180px' }}
                  value={marksSearch}
                  onChange={e => setMarksSearch(e.target.value)} />
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th><th>Student</th><th>Subject</th>
                        <th>Internal</th><th>Assignment</th><th>Total</th>
                        <th>Grade</th><th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMarks.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center text-muted py-3">
                            No marks entered yet
                          </td>
                        </tr>
                      ) : filteredMarks.map((m, i) => {
                        const { g, c } = getGrade(Number(m.total));
                        return (
                          <tr key={m._id || i}>
                            <td>{i + 1}</td>
                            <td>{m.studentId}</td>
                            <td>{m.subject || '—'}</td>
                            <td>{m.internal}</td>
                            <td>{m.assignment}</td>
                            <td><strong>{m.total}</strong></td>
                            <td><span className={`badge ${c}`}>{g}</span></td>
                            <td>
                              <button className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                                onClick={() => deleteMark(m._id)}><DeleteIcon fontSize="small"/></button>
                            </td>
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

        {/* ══ ATTENDANCE TAB ═══════════════════════════════════════════ */}
        {tab === 'attendance' && (
          <>
            {/* ATTENDANCE FORM */}
            <div className="card shadow-sm border-0 rounded-4 mb-4">
              <div className="card-header bg-info text-white rounded-top-4 d-flex align-items-center gap-2">
                <AssignmentIcon /> Mark Student Attendance
              </div>
              <div className="card-body">
                <form onSubmit={submitAtt} className="row g-3">

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Student</label>
                    <input type="text" className="form-control"
                      placeholder="Email or name"
                      list="attStudentDatalist"
                      value={aForm.student}
                      onChange={e => setAForm({...aForm, student: e.target.value})} />
                    <datalist id="attStudentDatalist">
                      {students.map(s => (
                        <option key={s.officialEmail} value={s.officialEmail}>{s.name}</option>
                      ))}
                    </datalist>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Date</label>
                    <input type="date" className="form-control"
                      value={aForm.date}
                      onChange={e => setAForm({...aForm, date: e.target.value})} />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Status</label>
                    <select className="form-select"
                      value={aForm.status}
                      onChange={e => setAForm({...aForm, status: e.target.value})}>
                      <option>Present</option>
                      <option>Absent</option>
                      <option>Late</option>
                    </select>
                  </div>

                  <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-info text-white w-100 d-flex align-items-center justify-content-center gap-1"><SaveIcon fontSize="small"/> Save</button>
                  </div>

                </form>
                {aMsg.text && (
                  <div className={`alert alert-${aMsg.type} mt-3 mb-0`}>{aMsg.text}</div>
                )}
              </div>
            </div>

            {/* ATTENDANCE TABLE */}
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-light d-flex align-items-center gap-2">
                <CalendarMonthIcon /> <strong>Attendance Records</strong>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr><th>#</th><th>Student</th><th>Date</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {sortedAtt.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center text-muted py-3">No records yet</td>
                        </tr>
                      ) : sortedAtt.map((a, i) => {
                        const badge = a.status === 'Present'
                          ? 'bg-success' : a.status === 'Late'
                          ? 'bg-warning text-dark' : 'bg-danger';
                        return (
                          <tr key={a._id || i}>
                            <td>{i + 1}</td>
                            <td>{a.student}</td>
                            <td>{a.date}</td>
                            <td><span className={`badge ${badge}`}>{a.status}</span></td>
                            <td>
                              <button className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                                onClick={() => deleteAtt(a._id)}><DeleteIcon fontSize="small"/></button>
                            </td>
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
                      ? <Link to="/reset-password" className="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2"><LockIcon /> Reset Password</Link>
                      : <button className="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2" disabled><LockIcon /> Reset Password</button>
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

export default FacultyDashboard;