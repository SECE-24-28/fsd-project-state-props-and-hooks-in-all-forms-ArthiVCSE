import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/',            label: '🏠 Home' },
  { path: '/about',       label: 'ℹ️ About' },
  { path: '/programmes',  label: '🎓 Programmes' },
  { path: '/departments', label: '🏢 Departments' },
  { path: '/faculties',   label: '👨‍🏫 Faculties' },
  { path: '/placements',  label: '💼 Placements' },
  { path: '/hostel',      label: '🏨 Hostel' },
  { path: '/login',       label: '🔐 Login' },
];

function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom">
      <div className="container">

        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <div className="logo-box me-3">A</div>
          <div className="logo-text">
            <h1 className="m-0">Ashford University</h1>
            <p className="m-0">Est. 1892 · NAAC A++</p>
          </div>
        </Link>

        <button className="navbar-toggler" type="button" onClick={() => setOpen(!open)}>
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${open ? 'show' : ''}`}>
          <ul className="navbar-nav">
            {navItems.map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <Link
                  className={`nav-link ${pathname === path ? 'fw-bold' : ''}`}
                  to={path}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;