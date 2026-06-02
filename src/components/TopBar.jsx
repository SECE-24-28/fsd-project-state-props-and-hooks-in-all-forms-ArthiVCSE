import React from 'react';
import { Link } from 'react-router-dom';

function TopBar({ message, linkTo, linkText }) {
  return (
    <div className="top-bar text-center">
      {message}
      {linkTo && (
        <Link to={linkTo} style={{ color: '#e6dede', textDecoration: 'none' }}>
          {' '}{linkText}
        </Link>
      )}
    </div>
  );
}

export default TopBar;