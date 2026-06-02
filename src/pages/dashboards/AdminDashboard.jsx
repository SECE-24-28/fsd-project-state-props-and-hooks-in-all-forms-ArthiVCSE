import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getUsers, saveUsers, getMarks, getRequests, saveRequests, doLogout, getGrade,
} from '../../utils/storage';

const DEPTS = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Management Studies',
];

const PROGS = [
  'B.Tech CSE','M.Tech CSE','B.Tech IT','M.Tech IT',
  'B.Tech ECE','M.Tech ECE','BBA','MBA',
];

const YEARS = ['1st Year','2nd Year','3rd Year','4th Year'];

const emptyForm = {
  name:'', role:'', dept:'', prog:'', year:'',
  personalEmail:'', officialEmail:'', password:'',
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [tab, setTab]           = useState('addUser');
  const [users, setUsers]       = useState([]);
  const [marks, setMarks]       = useState([]);
  const [requests, setRequests] = useState([]);
  const [form, setForm]         = useState(emptyForm);
  const [formMsg, setFormMsg]   = useState({ text:'', type:'' });
  const [filterRole, setFilterRole]   = useState('');
  const [searchUser, setSearchUser]   = useState('');

  // EDIT MODAL STATE
  const [editOpen, setEditOpen]     = useState(false);
  const [editIdx, setEditIdx]       = useState(null);
  const [editData, setEditData]     = useState({ name:'', dept:'', officialEmail:'', password:'' });

  // ── LOAD ───────────────────────────────────────────────────────────
  const loadUsers    = useCallback(() => setUsers(getUsers()),    []);
  const loadMarks    = useCallback(() => setMarks(getMarks()),    []);
  const loadRequests = useCallback(() => setRequests(getRequests()), []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  useEffect(() => {
    if (tab === 'manageUsers')   loadUsers();
    if (tab === 'marksOverview') loadMarks();
    if (tab === 'pwdRequests')   loadRequests();
  }, [tab, loadUsers, loadMarks, loadRequests]);

  // ── STATS ──────────────────────────────────────────────────────────
  const studentCount = users.filter(u => u.role === 'Student').length;
  const facultyCount = users.filter(u => u.role === 'Faculty').length;
  const pendingCount = requests.filter(r => r.status === 'Pending').length;

  // ── ADD USER ───────────────────────────────────────────────────────
  const handleAddUser = (e) => {
    e.preventDefault();
    const { name, role, officialEmail, password } = form;

    if (!name || !role || !officialEmail || !password) {
      setFormMsg({ text:'Name, Role, Official Email and Password are required.', type:'danger' }); return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@ford\.edu\.in$/.test(officialEmail)) {
      setFormMsg({ text:'Official email must be @ford.edu.in format.', type:'danger' }); return;
    }
    if (password.length < 6) {
      setFormMsg({ text:'Password must be at least 6 characters.', type:'danger' }); return;
    }

    const all = getUsers();
    if (all.find(u => u.officialEmail === officialEmail)) {
      setFormMsg({ text:'A user with this official email already exists.', type:'danger' }); return;
    }

    all.push({ ...form });
    saveUsers(all);
    loadUsers();
    setForm(emptyForm);
    setFormMsg({ text:`✅ ${role} "${name}" added successfully.`, type:'success' });
    setTimeout(() => setFormMsg({ text:'', type:'' }), 4000);
  };

  // ── DELETE USER ────────────────────────────────────────────────────
  const deleteUser = (index) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    const all = getUsers();
    all.splice(index, 1);
    saveUsers(all);
    loadUsers();
  };

  // ── EDIT USER ──────────────────────────────────────────────────────
  const openEdit = (index) => {
    const u = getUsers()[index];
    setEditIdx(index);
    setEditData({ name: u.name, dept: u.dept || '', officialEmail: u.officialEmail, password: '' });
    setEditOpen(true);
  };

  const saveEdit = () => {
    const all = getUsers();
    all[editIdx].name          = editData.name;
    all[editIdx].dept          = editData.dept;
    all[editIdx].officialEmail = editData.officialEmail;
    if (editData.password.length >= 6) all[editIdx].password = editData.password;
    saveUsers(all);
    loadUsers();
    setEditOpen(false);
  };

  // ── PASSWORD REQUESTS ──────────────────────────────────────────────
  const approveRequest = (index) => {
    const all = getRequests();
    all[index].status = 'Approved';
    saveRequests(all);
    sessionStorage.setItem('resetApproved', 'true');
    loadRequests();
  };

  const rejectRequest = (index) => {
    const all = getRequests();
    all[index].status = 'Rejected';
    saveRequests(all);
    loadRequests();
  };

  // ── FILTERED USERS ─────────────────────────────────────────────────
  const filteredUsers = users.filter(u => {
    const roleMatch = !filterRole || u.role === filterRole;
    const nameMatch = u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
                      u.officialEmail.toLowerCase().includes(searchUser.toLowerCase());
    return roleMatch && nameMatch;
  });

  const handleLogout = () => { doLogout(); navigate('/login'); };

  return (
    <div style={{ background:'#F3ECE2', minHeight:'100vh' }}>
      {/* TOP BAR */}
      <div className="top-bar text-center">🛡️ Administrator Control Panel</div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-light border-bottom">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="logo-box me-3">A</div>
            <div className="logo-text">
              <h1 className="m-0">Ashford University</h1>
              <p className="m-0">Admin Portal</p>
            </div>
          </div>
          <div className="ms-auto d-flex align-items-center gap-3">
            <span className="text-muted" style={{ fontSize:'13px' }}>🛡️ <strong>Administrator</strong></span>
            <button className="btn btn-danger" onClick={handleLogout}>🔓 Logout</button>
          </div>
        </div>
      </nav>

      <div className="container py-4">

        {/* WELCOME */}
        <div className="mb-4">
          <h3 className="mb-0">Welcome, Administrator 👋</h3>
          <p className="text-muted">Manage users, marks, password requests and university records.</p>
        </div>

        {/* STATS */}
        <div className="row g-3 mb-4">
          {[
            { label:'Total Students',   val:studentCount, cls:'stat-card blue',   col:'text-primary' },
            { label:'Total Faculty',    val:facultyCount, cls:'stat-card green',  col:'text-success' },
            { label:'Administrators',   val:1,            cls:'stat-card orange', col:'text-warning' },
            { label:'Pending Requests', val:pendingCount, cls:'stat-card red',    col:'text-danger'  },
          ].map(({ label, val, cls, col }) => (
            <div className="col-md-3" key={label}>
              <div className={`card shadow-sm border-0 ${cls} p-3`}>
                <div className={`stat-num ${col}`}>{val}</div>
                <div className="text-muted">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <ul className="nav nav-tabs mb-4 fw-semibold">
          {[
            ['addUser',      '➕ Add User'],
            ['manageUsers',  '👥 Manage Users'],
            ['marksOverview','📊 Marks Overview'],
            ['pwdRequests',  `🔑 Password Requests`],
          ].map(([id, label]) => (
            <li className="nav-item" key={id}>
              <button className={`nav-link ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
                {label}
                {id === 'pwdRequests' && pendingCount > 0 && (
                  <span className="badge bg-danger ms-1">{pendingCount}</span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* ── ADD USER ── */}
        {tab === 'addUser' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4">➕ Add New User</div>
            <div className="card-body p-4">
              <form onSubmit={handleAddUser}>
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input type="text" className="form-control" placeholder="e.g. Priya Sharma"
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Role</label>
                    <select className="form-select"
                      value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                      <option value="">Select Role</option>
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Department</label>
                    <select className="form-select"
                      value={form.dept} onChange={e => setForm({...form, dept: e.target.value})}>
                      <option value="">Select Department</option>
                      {DEPTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Programme</label>
                    <select className="form-select"
                      value={form.prog} onChange={e => setForm({...form, prog: e.target.value})}>
                      <option value="">Select Programme</option>
                      {PROGS.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Personal Email</label>
                    <input type="email" className="form-control" placeholder="personal@gmail.com"
                      value={form.personalEmail} onChange={e => setForm({...form, personalEmail: e.target.value})} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Official Email (University)</label>
                    <input type="email" className="form-control" placeholder="name@ford.edu.in"
                      value={form.officialEmail} onChange={e => setForm({...form, officialEmail: e.target.value})} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Password</label>
                    <input type="text" className="form-control" placeholder="Minimum 6 characters"
                      value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                  </div>

                  {form.role === 'Student' && (
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Year</label>
                      <select className="form-select"
                        value={form.year} onChange={e => setForm({...form, year: e.target.value})}>
                        <option value="">Select Year</option>
                        {YEARS.map(y => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                  )}

                </div>

                {formMsg.text && (
                  <div className={`alert alert-${formMsg.type} mt-3`}>{formMsg.text}</div>
                )}

                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn btn-success px-4">✅ Add User</button>
                  <button type="button" className="btn btn-outline-secondary px-4"
                    onClick={() => setForm(emptyForm)}>🔄 Clear</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── MANAGE USERS ── */}
        {tab === 'manageUsers' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
              <span>👥 User Management</span>
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm w-auto"
                  value={filterRole} onChange={e => setFilterRole(e.target.value)}>
                  <option value="">All Roles</option>
                  <option value="Student">Students</option>
                  <option value="Faculty">Faculty</option>
                </select>
                <input type="text" className="form-control form-control-sm"
                  placeholder="🔍 Search..." style={{ width:'160px' }}
                  value={searchUser} onChange={e => setSearchUser(e.target.value)} />
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>#</th><th>Name</th><th>Role</th><th>Department</th><th>Programme</th><th>Official Email</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0
                      ? <tr><td colSpan="7" className="text-center text-muted py-3">No users found</td></tr>
                      : filteredUsers.map((u, idx) => {
                          const globalIndex = users.indexOf(u);
                          const badge = u.role === 'Student'
                            ? <span className="badge bg-primary">Student</span>
                            : <span className="badge bg-success">Faculty</span>;
                          return (
                            <tr key={idx}>
                              <td>{idx+1}</td>
                              <td><strong>{u.name}</strong></td>
                              <td>{badge}</td>
                              <td>{u.dept || '—'}</td>
                              <td>{u.prog || '—'}</td>
                              <td>{u.officialEmail}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => openEdit(globalIndex)}>✏️ Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteUser(globalIndex)}>🗑 Delete</button>
                              </td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── MARKS OVERVIEW ── */}
        {tab === 'marksOverview' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-success text-white rounded-top-4">📊 All Student Marks</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>#</th><th>Student Email</th><th>Subject</th><th>Internal (25)</th><th>Assignment (25)</th><th>Total (50)</th><th>Grade</th></tr>
                  </thead>
                  <tbody>
                    {marks.length === 0
                      ? <tr><td colSpan="7" className="text-center text-muted py-3">No marks entered yet</td></tr>
                      : marks.map((m, i) => {
                          const { g, c } = getGrade(Number(m.total));
                          return (
                            <tr key={i}>
                              <td>{i+1}</td>
                              <td>{m.studentId}</td>
                              <td>{m.subject || '—'}</td>
                              <td>{m.internal}</td>
                              <td>{m.assignment}</td>
                              <td><strong>{m.total}</strong></td>
                              <td><span className={`badge ${c}`}>{g}</span></td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── PASSWORD REQUESTS ── */}
        {tab === 'pwdRequests' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-warning rounded-top-4">🔑 Forgot Password Requests</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>#</th><th>User Email</th><th>Reason</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {requests.length === 0
                      ? <tr><td colSpan="5" className="text-center text-muted py-3">No password requests</td></tr>
                      : requests.map((req, i) => {
                          const badge = req.status === 'Approved'
                            ? <span className="badge bg-success">Approved</span>
                            : req.status === 'Rejected'
                            ? <span className="badge bg-danger">Rejected</span>
                            : <span className="badge bg-warning text-dark">Pending</span>;

                          const actions = req.status === 'Pending'
                            ? <>
                                <button className="btn btn-sm btn-success me-1" onClick={() => approveRequest(i)}>✅ Approve</button>
                                <button className="btn btn-sm btn-danger" onClick={() => rejectRequest(i)}>❌ Reject</button>
                              </>
                            : <span className="text-muted small">{req.status}</span>;

                          return (
                            <tr key={i}>
                              <td>{i+1}</td>
                              <td>{req.email}</td>
                              <td>{req.reason || '—'}</td>
                              <td>{badge}</td>
                              <td>{actions}</td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── EDIT MODAL ── */}
      {editOpen && (
        <div className="modal show d-block" style={{ background:'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content rounded-4">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">✏️ Edit User</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setEditOpen(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input type="text" className="form-control" value={editData.name}
                    onChange={e => setEditData({...editData, name: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Department</label>
                  <select className="form-select" value={editData.dept}
                    onChange={e => setEditData({...editData, dept: e.target.value})}>
                    {DEPTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Official Email</label>
                  <input type="email" className="form-control" value={editData.officialEmail}
                    onChange={e => setEditData({...editData, officialEmail: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">New Password (leave blank to keep)</label>
                  <input type="text" className="form-control" placeholder="Enter new password or leave blank"
                    value={editData.password}
                    onChange={e => setEditData({...editData, password: e.target.value})} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={saveEdit}>💾 Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer mt-4">
        <div className="footer-bottom">© 2026 Ashford University · All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default AdminDashboard;