import React from 'react';
import './styles.scss';

const ContactFooter: React.FC = () => {
  const handleContactClick = () => {
    alert('Contact button clicked');
  };

  return (
    <div className="footer">
      <button className="contact-button" onClick={handleContactClick}>Contact</button>
    </div>
  );
};

export default ContactFooter;