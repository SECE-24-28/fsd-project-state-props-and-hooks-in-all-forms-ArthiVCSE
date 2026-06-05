// ── API BASE URL ──────────────────────────────────────────────────
export const API = 'https://ashford-college-management-backend-1.onrender.com/api';

// ── ADMIN CREDENTIALS (hardcoded, never changes) ──────────────────
export const ADMIN_EMAIL = 'admin@ford.edu.in';
export const ADMIN_PASSWORD = 'Admin@123';
export const ADMIN_ROLE = 'Admin';

// ── AUTH (session management stays client-side) ───────────────────
export const getLoggedEmail = () => sessionStorage.getItem('sessionEmail') || '';
export const getLoggedRole = () => sessionStorage.getItem('sessionRole') || '';
export const getLoggedUser = () => JSON.parse(sessionStorage.getItem('sessionUser')) || {};

export const doLogin = (user) => {
  sessionStorage.setItem('loginStatus', 'Logged In');
  sessionStorage.setItem('sessionEmail', user.officialEmail || user.email);
  sessionStorage.setItem('sessionRole', user.role);
  sessionStorage.setItem('sessionUser', JSON.stringify(user));
};

export const doLogout = () => {
  sessionStorage.clear();
};

export const isLoggedIn = () => sessionStorage.getItem('loginStatus') === 'Logged In';

// ── GRADE HELPER ───────────────────────────────────────────────────
export const getGrade = (total) => {
  const t = Number(total);
  if (t >= 45) return { g: 'O', c: 'bg-success' };
  if (t >= 40) return { g: 'A+', c: 'bg-primary' };
  if (t >= 35) return { g: 'A', c: 'bg-info text-dark' };
  if (t >= 30) return { g: 'B+', c: 'bg-warning text-dark' };
  if (t >= 25) return { g: 'B', c: 'bg-secondary' };
  return { g: 'F', c: 'bg-danger' };
};

// ── VALIDATION HELPERS ─────────────────────────────────────────────
export const validateUniversityEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@ford\.edu\.in$/.test(email);

export const validateGeneralEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const validatePhone = (phone) =>
  /^[0-9]{10}$/.test(phone);

export const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/.test(password);

export const validateName = (name) =>
  name.trim().length >= 2;

// ── API HELPER (generic fetch wrapper) ─────────────────────────────
const apiFetch = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
};

// ── USER API ──────────────────────────────────────────────────────
export const apiLogin = (body) => apiFetch(`${API}/users/login`, { method: 'POST', body: JSON.stringify(body) });
export const apiGetUsers = (role = '') => apiFetch(`${API}/users${role ? `?role=${role}` : ''}`);
export const apiGetUser = (id) => apiFetch(`${API}/users/${id}`);
export const apiCreateUser = (body) => apiFetch(`${API}/users`, { method: 'POST', body: JSON.stringify(body) });
export const apiUpdateUser = (id, body) => apiFetch(`${API}/users/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const apiDeleteUser = (id) => apiFetch(`${API}/users/${id}`, { method: 'DELETE' });
export const apiResetPwd = (body) => apiFetch(`${API}/users/reset-password/update`, { method: 'PUT', body: JSON.stringify(body) });

// ── MARKS API ─────────────────────────────────────────────────────
export const apiUpsertMark = (body) => apiFetch(`${API}/marks`, { method: 'POST', body: JSON.stringify(body) });
export const apiGetAllMarks = () => apiFetch(`${API}/marks`);
export const apiGetStudentMarks = (email) => apiFetch(`${API}/marks/student/${encodeURIComponent(email)}`);
export const apiDeleteMark = (id) => apiFetch(`${API}/marks/${id}`, { method: 'DELETE' });

// ── ATTENDANCE API ────────────────────────────────────────────────
export const apiUpsertAtt = (body) => apiFetch(`${API}/attendance`, { method: 'POST', body: JSON.stringify(body) });
export const apiGetAllAtt = () => apiFetch(`${API}/attendance`);
export const apiGetStudentAtt = (email) => apiFetch(`${API}/attendance/student/${encodeURIComponent(email)}`);
export const apiDeleteAtt = (id) => apiFetch(`${API}/attendance/${id}`, { method: 'DELETE' });

// ── RESET REQUESTS API ────────────────────────────────────────────
export const apiCreateRequest = (body) => apiFetch(`${API}/reset-requests`, { method: 'POST', body: JSON.stringify(body) });
export const apiGetAllRequests = () => apiFetch(`${API}/reset-requests`);
export const apiGetUserRequests = (email) => apiFetch(`${API}/reset-requests/user/${encodeURIComponent(email)}`);
export const apiUpdateRequest = (id, body) => apiFetch(`${API}/reset-requests/${id}`, { method: 'PUT', body: JSON.stringify(body) });

// ── ENQUIRIES API ─────────────────────────────────────────────────
export const apiCreateEnquiry = (body) => apiFetch(`${API}/enquiries`, { method: 'POST', body: JSON.stringify(body) });
export const apiGetEnquiries = () => apiFetch(`${API}/enquiries`);
export const apiDeleteEnquiry = (id) => apiFetch(`${API}/enquiries/${id}`, { method: 'DELETE' });

// ── CONTACTS API ──────────────────────────────────────────────────
export const apiCreateContact = (body) => apiFetch(`${API}/contacts`, { method: 'POST', body: JSON.stringify(body) });
export const apiGetContacts = () => apiFetch(`${API}/contacts`);
export const apiDeleteContact = (id) => apiFetch(`${API}/contacts/${id}`, { method: 'DELETE' });

// ── PROGRAMMES API ────────────────────────────────────────────────
export const apiGetProgrammes = () => apiFetch(`${API}/programmes`);
export const apiCreateProgramme = (body) => apiFetch(`${API}/programmes`, { method: 'POST', body: JSON.stringify(body) });
export const apiDeleteProgramme = (id) => apiFetch(`${API}/programmes/${id}`, { method: 'DELETE' });

// ── DEPARTMENTS API ───────────────────────────────────────────────
export const apiGetDepartments = () => apiFetch(`${API}/departments`);
export const apiCreateDepartment = (body) => apiFetch(`${API}/departments`, { method: 'POST', body: JSON.stringify(body) });
export const apiDeleteDepartment = (id) => apiFetch(`${API}/departments/${id}`, { method: 'DELETE' });