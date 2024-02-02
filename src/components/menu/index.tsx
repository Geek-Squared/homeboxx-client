import React from 'react';
import './styles.scss';

const MobileMenu: React.FC = () => {
  return (
    <div className="mobile-menu">
      <a href="/">Home</a>
      <a href="/messages">Messages</a>
      <a href="/listings">Listings</a>
      <a href="/profile">Profile</a>
    </div>
  );
};

export default MobileMenu;