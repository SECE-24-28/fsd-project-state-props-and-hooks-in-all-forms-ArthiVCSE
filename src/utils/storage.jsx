export const getUsers     = () => JSON.parse(localStorage.getItem('users'))         || [];
export const saveUsers    = (u) => localStorage.setItem('users', JSON.stringify(u));

export const getMarks     = () => JSON.parse(localStorage.getItem('studentMarks'))  || [];
export const saveMarks    = (m) => localStorage.setItem('studentMarks', JSON.stringify(m));

export const getAtt       = () => JSON.parse(localStorage.getItem('attendance'))    || [];
export const saveAtt      = (a) => localStorage.setItem('attendance', JSON.stringify(a));

export const getRequests  = () => JSON.parse(localStorage.getItem('resetRequests')) || [];
export const saveRequests = (r) => localStorage.setItem('resetRequests', JSON.stringify(r));

export const getLoggedEmail = () => localStorage.getItem('universityEmail') || '';
export const getLoggedRole  = () => localStorage.getItem('userRole') || '';
export const getLoggedUser  = () => JSON.parse(localStorage.getItem('loggedInUser')) || {};

export const doLogout = () => {
  sessionStorage.clear();
  localStorage.removeItem('loggedInUser');
};

export const getGrade = (total) => {
  if (total >= 45) return { g: 'O',  c: 'bg-success' };
  if (total >= 40) return { g: 'A+', c: 'bg-primary' };
  if (total >= 35) return { g: 'A',  c: 'bg-info text-dark' };
  if (total >= 30) return { g: 'B+', c: 'bg-warning text-dark' };
  if (total >= 25) return { g: 'B',  c: 'bg-secondary' };
  return                  { g: 'F',  c: 'bg-danger' };
};