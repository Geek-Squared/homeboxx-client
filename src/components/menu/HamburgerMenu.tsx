import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../customHooks/auth';
import './styles.scss';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout: storeLogout } = useStore();

  const logout = () => {
    storeLogout();
    navigate('/login');
    // remove userID from session storage
    sessionStorage.removeItem('userID');
  };

  return (
    <div className="hamburger-menu">
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {isOpen && (
        <div className="menu-links">
          <Link to="/add-property">Add Property</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;