import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ── SVG Icons (no emojis) ───────────────────────────── */
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const AboutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const ProgrammesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const DeptIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
  </svg>
);
const FacultyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const PlacementsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10"/>
    <line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6"  y1="20" x2="6"  y2="16"/>
  </svg>
);
const HostelIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <line x1="9" y1="22" x2="9" y2="14"/><line x1="15" y1="22" x2="15" y2="14"/>
    <line x1="9" y1="14" x2="15" y2="14"/>
  </svg>
);
const LoginIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

/* ── Nav items list ───────────────────────────────── */
const navItems = [
  { path: '/',            label: 'Home',        Icon: HomeIcon        },
  { path: '/about',       label: 'About',       Icon: AboutIcon       },
  { path: '/programmes',  label: 'Programmes',  Icon: ProgrammesIcon  },
  { path: '/departments', label: 'Departments', Icon: DeptIcon        },
  { path: '/faculties',   label: 'Faculties',   Icon: FacultyIcon     },
  { path: '/placements',  label: 'Placements',  Icon: PlacementsIcon  },
  { path: '/hostel',      label: 'Hostel',      Icon: HostelIcon      },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <div className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo" style={{ textDecoration:'none' }} onClick={() => setOpen(false)}>
        <div className="logo-box">A</div>
        <div className="logo-text">
          <h1>Ashford University</h1>
          <p>Est. 1892 · NAAC A++</p>
        </div>
      </Link>

      {/* HAMBURGER — shown on mobile only via CSS */}
      <button
        className="au-hamburger"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation"
        style={{
          display: 'none',          /* CSS shows this on mobile */
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: '1.5px solid #2E2C78',
          borderRadius: '7px',
          padding: '5px 8px',
          cursor: 'pointer',
          color: '#2E2C78',
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* NAV LINKS */}
      <div className={`nav-links${open ? ' open' : ''}`}>

        {navItems.map(({ path, label, Icon }) => (
          <Link
            key={path}
            to={path}
            className={isActive(path) ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            <Icon />
            {label}
          </Link>
        ))}

        <Link
          to="/login"
          className={`nav-login${isActive('/login') ? ' active' : ''}`}
          onClick={() => setOpen(false)}
        >
          <LoginIcon />
          Login
        </Link>

      </div>
    </div>
  );
}