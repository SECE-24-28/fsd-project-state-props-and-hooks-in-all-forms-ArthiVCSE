import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  apiGetUsers, apiCreateUser, apiUpdateUser, apiDeleteUser,
  apiGetAllMarks, apiGetAllRequests, apiUpdateRequest,
  apiCreateProgramme, apiCreateDepartment,
  doLogout, getGrade,
} from '../../utils/storage';

// MUI Icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

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

const emptyStudent = { name:'', dept:'', prog:'', year:'', personalEmail:'', officialEmail:'', password:'' };
const emptyFaculty = { name:'', dept:'', designation:'', description:'', profileImg:'', personalEmail:'', officialEmail:'', password:'' };
const emptyProg    = { title:'', desc:'', img:'', type:'', points:'' };
const emptyDept    = { title:'', desc:'', img:'', facts:'', ug:'', pg:'', research:'' };

function AdminDashboard() {
  const navigate = useNavigate();

  const [tab, setTab]           = useState('addStudent');
  const [users, setUsers]       = useState([]);
  const [marks, setMarks]       = useState([]);
  const [requests, setRequests] = useState([]);
  const [filterRole, setFilterRole] = useState('');
  const [searchUser, setSearchUser] = useState('');

  // Forms
  const [studentForm, setStudentForm] = useState(emptyStudent);
  const [facultyForm, setFacultyForm] = useState(emptyFaculty);
  const [progForm, setProgForm]       = useState(emptyProg);
  const [deptForm, setDeptForm]       = useState(emptyDept);
  
  const [formMsg, setFormMsg] = useState({ text:'', type:'' });

  // EDIT MODAL STATE
  const [editOpen, setEditOpen]     = useState(false);
  const [editId, setEditId]         = useState(null);
  const [editData, setEditData]     = useState({ name:'', dept:'', officialEmail:'', password:'' });

  // ── LOAD ───────────────────────────────────────────────────────────
  const loadUsers = useCallback(async () => {
    try {
      const res = await apiGetUsers();
      setUsers(res.data);
    } catch (err) { console.error('Error loading users:', err); }
  }, []);

  const loadMarks = useCallback(async () => {
    try {
      const res = await apiGetAllMarks();
      setMarks(res.data);
    } catch (err) { console.error('Error loading marks:', err); }
  }, []);

  const loadRequests = useCallback(async () => {
    try {
      const res = await apiGetAllRequests();
      setRequests(res.data);
    } catch (err) { console.error('Error loading requests:', err); }
  }, []);

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

  const showMsg = (text, type='success') => {
    setFormMsg({ text, type });
    setTimeout(() => setFormMsg({ text:'', type:'' }), 4000);
  };

  // ── ADD USER HANDLER ────────────────────────────────────────────────
  const handleAddUser = async (e, role) => {
    e.preventDefault();
    const isStudent = role === 'Student';
    const form = isStudent ? studentForm : facultyForm;
    
    if (!form.name || !form.officialEmail || !form.password) {
      showMsg('Name, Official Email and Password are required.', 'danger'); return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@ford\.edu\.in$/.test(form.officialEmail)) {
      showMsg('Official email must be @ford.edu.in format.', 'danger'); return;
    }
    if (form.password.length < 6) {
      showMsg('Password must be at least 6 characters.', 'danger'); return;
    }

    try {
      await apiCreateUser({ ...form, role });
      await loadUsers();
      if (isStudent) setStudentForm(emptyStudent);
      else setFacultyForm(emptyFaculty);
      showMsg(`✅ ${role} "${form.name}" added successfully.`);
    } catch (err) {
      showMsg(err.message || 'Error adding user.', 'danger');
    }
  };

  // ── ADD PROGRAMME HANDLER ───────────────────────────────────────────
  const handleAddProg = async (e) => {
    e.preventDefault();
    if (!progForm.title || !progForm.desc || !progForm.type) {
      showMsg('Title, Description and Type are required.', 'danger'); return;
    }
    try {
      const payload = {
        ...progForm,
        points: progForm.points.split(',').map(p => p.trim()).filter(p => p)
      };
      await apiCreateProgramme(payload);
      setProgForm(emptyProg);
      showMsg('✅ Programme added successfully.');
    } catch (err) {
      showMsg(err.message || 'Error adding programme.', 'danger');
    }
  };

  // ── ADD DEPARTMENT HANDLER ──────────────────────────────────────────
  const handleAddDept = async (e) => {
    e.preventDefault();
    if (!deptForm.title || !deptForm.desc) {
      showMsg('Title and Description are required.', 'danger'); return;
    }
    try {
      const payload = {
        ...deptForm,
        facts: deptForm.facts.split(',').map(p => p.trim()).filter(p => p)
      };
      await apiCreateDepartment(payload);
      setDeptForm(emptyDept);
      showMsg('✅ Department added successfully.');
    } catch (err) {
      showMsg(err.message || 'Error adding department.', 'danger');
    }
  };

  // ── USER ACTIONS ────────────────────────────────────────────────────
  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await apiDeleteUser(id);
      await loadUsers();
    } catch (err) { console.error('Error deleting user:', err); }
  };

  const openEdit = (user) => {
    setEditId(user._id);
    setEditData({ name: user.name, dept: user.dept || '', officialEmail: user.officialEmail, password: '' });
    setEditOpen(true);
  };

  const saveEdit = async () => {
    try {
      await apiUpdateUser(editId, editData);
      await loadUsers();
      setEditOpen(false);
    } catch (err) { console.error('Error updating user:', err); }
  };

  // ── PASSWORD REQUESTS ──────────────────────────────────────────────
  const approveRequest = async (id) => {
    try {
      await apiUpdateRequest(id, { status: 'Approved' });
      await loadRequests();
    } catch (err) { console.error('Error approving request:', err); }
  };

  const rejectRequest = async (id) => {
    try {
      await apiUpdateRequest(id, { status: 'Rejected' });
      await loadRequests();
    } catch (err) { console.error('Error rejecting request:', err); }
  };

  const filteredUsers = users.filter(u => {
    const roleMatch = !filterRole || u.role === filterRole;
    const nameMatch = u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
                      u.officialEmail.toLowerCase().includes(searchUser.toLowerCase());
    return roleMatch && nameMatch;
  });

  const handleLogout = () => { doLogout(); navigate('/login'); };

  // ── TAB RENDERING HELPER ──────────────────────────────────────────
  const renderTabBtn = (id, label, IconComp) => (
    <li className="nav-item" key={id}>
      <button className={`nav-link d-flex align-items-center gap-1 ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
        <IconComp fontSize="small" />
        {label}
        {id === 'pwdRequests' && pendingCount > 0 && (
          <span className="badge bg-danger ms-1">{pendingCount}</span>
        )}
      </button>
    </li>
  );

  return (
    <div style={{ background:'#F3ECE2', minHeight:'100vh' }}>
      <div className="top-bar text-center d-flex justify-content-center align-items-center gap-2">
        <AdminPanelSettingsIcon /> Administrator Control Panel
      </div>

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
            <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize:'13px' }}>
              <AdminPanelSettingsIcon fontSize="small"/> <strong>Administrator</strong>
            </span>
            <button className="btn btn-danger d-flex align-items-center gap-1" onClick={handleLogout}>
              <LogoutIcon fontSize="small"/> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">

        <div className="mb-4">
          <h3 className="mb-0">Welcome, Administrator 👋</h3>
          <p className="text-muted">Manage users, programmes, departments, marks, and records.</p>
        </div>

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

        <ul className="nav nav-tabs mb-4 fw-semibold border-0">
          {renderTabBtn('addStudent', 'Add Student', PersonAddIcon)}
          {renderTabBtn('addFaculty', 'Add Faculty', BadgeIcon)}
          {renderTabBtn('manageUsers', 'Manage Users', GroupIcon)}
          {renderTabBtn('addProg', 'Add Programme', PostAddIcon)}
          {renderTabBtn('addDept', 'Add Department', DomainAddIcon)}
          {renderTabBtn('marksOverview', 'Marks Overview', AssessmentIcon)}
          {renderTabBtn('pwdRequests', 'Password Requests', VpnKeyIcon)}
        </ul>

        {/* ── ADD STUDENT ── */}
        {tab === 'addStudent' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4 d-flex align-items-center gap-2">
              <PersonAddIcon /> Add New Student
            </div>
            <div className="card-body p-4">
              <form onSubmit={e => handleAddUser(e, 'Student')}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input type="text" className="form-control" value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Department</label>
                    <select className="form-select" value={studentForm.dept} onChange={e => setStudentForm({...studentForm, dept: e.target.value})}>
                      <option value="">Select</option>{DEPTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Programme</label>
                    <select className="form-select" value={studentForm.prog} onChange={e => setStudentForm({...studentForm, prog: e.target.value})}>
                      <option value="">Select</option>{PROGS.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Year</label>
                    <select className="form-select" value={studentForm.year} onChange={e => setStudentForm({...studentForm, year: e.target.value})}>
                      <option value="">Select</option>{YEARS.map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Personal Email</label>
                    <input type="email" className="form-control" value={studentForm.personalEmail} onChange={e => setStudentForm({...studentForm, personalEmail: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Official Email</label>
                    <input type="email" className="form-control" value={studentForm.officialEmail} onChange={e => setStudentForm({...studentForm, officialEmail: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Password</label>
                    <input type="text" className="form-control" value={studentForm.password} onChange={e => setStudentForm({...studentForm, password: e.target.value})} />
                  </div>
                </div>
                {formMsg.text && tab === 'addStudent' && <div className={`alert alert-${formMsg.type} mt-3`}>{formMsg.text}</div>}
                <div className="mt-4"><button className="btn btn-primary d-flex align-items-center gap-1"><SaveIcon fontSize="small"/> Save Student</button></div>
              </form>
            </div>
          </div>
        )}

        {/* ── ADD FACULTY ── */}
        {tab === 'addFaculty' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-success text-white rounded-top-4 d-flex align-items-center gap-2">
              <BadgeIcon /> Add New Faculty
            </div>
            <div className="card-body p-4">
              <form onSubmit={e => handleAddUser(e, 'Faculty')}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input type="text" className="form-control" value={facultyForm.name} onChange={e => setFacultyForm({...facultyForm, name: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Designation (e.g., Professor - IT)</label>
                    <input type="text" className="form-control" value={facultyForm.designation} onChange={e => setFacultyForm({...facultyForm, designation: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Department</label>
                    <select className="form-select" value={facultyForm.dept} onChange={e => setFacultyForm({...facultyForm, dept: e.target.value})}>
                      <option value="">Select</option>{DEPTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Profile Image URL</label>
                    <input type="text" className="form-control" placeholder="/images/facultyX.jpg" value={facultyForm.profileImg} onChange={e => setFacultyForm({...facultyForm, profileImg: e.target.value})} />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-semibold">Short Description / Bio</label>
                    <textarea className="form-control" rows="2" value={facultyForm.description} onChange={e => setFacultyForm({...facultyForm, description: e.target.value})}></textarea>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Personal Email</label>
                    <input type="email" className="form-control" value={facultyForm.personalEmail} onChange={e => setFacultyForm({...facultyForm, personalEmail: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Official Email</label>
                    <input type="email" className="form-control" value={facultyForm.officialEmail} onChange={e => setFacultyForm({...facultyForm, officialEmail: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Password</label>
                    <input type="text" className="form-control" value={facultyForm.password} onChange={e => setFacultyForm({...facultyForm, password: e.target.value})} />
                  </div>
                </div>
                {formMsg.text && tab === 'addFaculty' && <div className={`alert alert-${formMsg.type} mt-3`}>{formMsg.text}</div>}
                <div className="mt-4"><button className="btn btn-success d-flex align-items-center gap-1"><SaveIcon fontSize="small"/> Save Faculty</button></div>
              </form>
            </div>
          </div>
        )}

        {/* ── MANAGE USERS ── */}
        {tab === 'manageUsers' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center gap-2"><GroupIcon/> User Management</span>
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm w-auto" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
                  <option value="">All Roles</option><option value="Student">Students</option><option value="Faculty">Faculty</option>
                </select>
                <input type="text" className="form-control form-control-sm" placeholder="Search..." style={{ width:'160px' }} value={searchUser} onChange={e => setSearchUser(e.target.value)} />
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>#</th><th>Name</th><th>Role</th><th>Department</th><th>Official Email</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? <tr><td colSpan="6" className="text-center text-muted py-3">No users found</td></tr>
                      : filteredUsers.map((u, idx) => (
                        <tr key={u._id}>
                          <td>{idx+1}</td>
                          <td><strong>{u.name}</strong></td>
                          <td><span className={`badge bg-${u.role === 'Student' ? 'primary' : 'success'}`}>{u.role}</span></td>
                          <td>{u.dept || '—'}</td>
                          <td>{u.officialEmail}</td>
                          <td className="d-flex gap-1">
                            <button className="btn btn-sm btn-outline-primary d-flex align-items-center" onClick={() => openEdit(u)}><EditIcon fontSize="small"/></button>
                            <button className="btn btn-sm btn-danger d-flex align-items-center" onClick={() => deleteUser(u._id)}><DeleteIcon fontSize="small"/></button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ADD PROGRAMME ── */}
        {tab === 'addProg' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-info text-white rounded-top-4 d-flex align-items-center gap-2">
              <PostAddIcon /> Add New Programme
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleAddProg}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Programme Title</label>
                    <input type="text" className="form-control" value={progForm.title} onChange={e => setProgForm({...progForm, title: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Type</label>
                    <select className="form-select" value={progForm.type} onChange={e => setProgForm({...progForm, type: e.target.value})}>
                      <option value="">Select</option><option value="Engineering">Engineering</option><option value="Management">Management</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea className="form-control" rows="2" value={progForm.desc} onChange={e => setProgForm({...progForm, desc: e.target.value})}></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Image URL</label>
                    <input type="text" className="form-control" placeholder="/images/cse.jpg" value={progForm.img} onChange={e => setProgForm({...progForm, img: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Key Points (comma separated)</label>
                    <input type="text" className="form-control" placeholder="Smart Labs, Hackathons, Internships" value={progForm.points} onChange={e => setProgForm({...progForm, points: e.target.value})} />
                  </div>
                </div>
                {formMsg.text && tab === 'addProg' && <div className={`alert alert-${formMsg.type} mt-3`}>{formMsg.text}</div>}
                <div className="mt-4"><button className="btn btn-info text-white d-flex align-items-center gap-1"><SaveIcon fontSize="small"/> Save Programme</button></div>
              </form>
            </div>
          </div>
        )}

        {/* ── ADD DEPARTMENT ── */}
        {tab === 'addDept' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-secondary text-white rounded-top-4 d-flex align-items-center gap-2">
              <DomainAddIcon /> Add New Department
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleAddDept}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Department Title</label>
                    <input type="text" className="form-control" value={deptForm.title} onChange={e => setDeptForm({...deptForm, title: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Image URL</label>
                    <input type="text" className="form-control" placeholder="/images/cse-dept.jpg" value={deptForm.img} onChange={e => setDeptForm({...deptForm, img: e.target.value})} />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea className="form-control" rows="2" value={deptForm.desc} onChange={e => setDeptForm({...deptForm, desc: e.target.value})}></textarea>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-semibold">Facts (comma separated)</label>
                    <input type="text" className="form-control" placeholder="12 Research Labs, 85 Faculty Members" value={deptForm.facts} onChange={e => setDeptForm({...deptForm, facts: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">UG Programme(s)</label>
                    <input type="text" className="form-control" value={deptForm.ug} onChange={e => setDeptForm({...deptForm, ug: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">PG Programme(s)</label>
                    <input type="text" className="form-control" value={deptForm.pg} onChange={e => setDeptForm({...deptForm, pg: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Research Presence</label>
                    <input type="text" className="form-control" value={deptForm.research} onChange={e => setDeptForm({...deptForm, research: e.target.value})} />
                  </div>
                </div>
                {formMsg.text && tab === 'addDept' && <div className={`alert alert-${formMsg.type} mt-3`}>{formMsg.text}</div>}
                <div className="mt-4"><button className="btn btn-secondary d-flex align-items-center gap-1"><SaveIcon fontSize="small"/> Save Department</button></div>
              </form>
            </div>
          </div>
        )}

        {/* ── MARKS OVERVIEW ── */}
        {tab === 'marksOverview' && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-warning text-dark rounded-top-4 d-flex align-items-center gap-2">
              <AssessmentIcon /> All Student Marks
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>#</th><th>Student Email</th><th>Subject</th><th>Internal</th><th>Assignment</th><th>Total</th><th>Grade</th></tr>
                  </thead>
                  <tbody>
                    {marks.length === 0 ? <tr><td colSpan="7" className="text-center text-muted py-3">No marks entered yet</td></tr>
                      : marks.map((m, i) => {
                          const { g, c } = getGrade(Number(m.total));
                          return (
                            <tr key={m._id || i}>
                              <td>{i+1}</td><td>{m.studentId}</td><td>{m.subject || '—'}</td>
                              <td>{m.internal}</td><td>{m.assignment}</td><td><strong>{m.total}</strong></td>
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
            <div className="card-header bg-danger text-white rounded-top-4 d-flex align-items-center gap-2">
              <VpnKeyIcon /> Forgot Password Requests
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>#</th><th>User Email</th><th>Reason</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? <tr><td colSpan="5" className="text-center text-muted py-3">No password requests</td></tr>
                      : requests.map((req, i) => {
                          const isAppr = req.status === 'Approved';
                          const isRej = req.status === 'Rejected';
                          const badge = isAppr ? <span className="badge bg-success">Approved</span> :
                                        isRej ? <span className="badge bg-danger">Rejected</span> :
                                        <span className="badge bg-warning text-dark">Pending</span>;

                          const actions = req.status === 'Pending' ? <>
                                <button className="btn btn-sm btn-success me-1 d-inline-flex align-items-center gap-1" onClick={() => approveRequest(req._id)}><CheckCircleIcon fontSize="small"/> Approve</button>
                                <button className="btn btn-sm btn-danger d-inline-flex align-items-center gap-1" onClick={() => rejectRequest(req._id)}><CancelIcon fontSize="small"/> Reject</button>
                              </> : <span className="text-muted small">{req.status}</span>;

                          return (
                            <tr key={req._id || i}>
                              <td>{i+1}</td><td>{req.email}</td><td>{req.reason || '—'}</td><td>{badge}</td><td>{actions}</td>
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
                <h5 className="modal-title d-flex align-items-center gap-2"><EditIcon/> Edit User</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setEditOpen(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3"><label className="form-label fw-semibold">Full Name</label><input type="text" className="form-control" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} /></div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Department</label>
                  <select className="form-select" value={editData.dept} onChange={e => setEditData({...editData, dept: e.target.value})}>
                    {DEPTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label className="form-label fw-semibold">Official Email</label><input type="email" className="form-control" value={editData.officialEmail} onChange={e => setEditData({...editData, officialEmail: e.target.value})} /></div>
                <div className="mb-3"><label className="form-label fw-semibold">New Password (leave blank to keep)</label><input type="text" className="form-control" placeholder="Enter new password or leave blank" value={editData.password} onChange={e => setEditData({...editData, password: e.target.value})} /></div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary d-flex align-items-center gap-1" onClick={() => setEditOpen(false)}><CloseIcon fontSize="small"/> Cancel</button>
                <button className="btn btn-primary d-flex align-items-center gap-1" onClick={saveEdit}><SaveIcon fontSize="small"/> Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer mt-4"><div className="footer-bottom">© 2026 Ashford University · All Rights Reserved</div></footer>
    </div>
  );
}

export default AdminDashboard;