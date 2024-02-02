// ToggleButton.tsx
import React, { useState } from 'react';
import './styles.scss';

interface IToggleButtonProps {
  onToggle: (active: string) => void;
}

const ToggleButton: React.FC<IToggleButtonProps> = ({ onToggle }) => {
  const [active, setActive] = useState('rent');

  const handleToggle = (value: string) => {
    const listingType = value === 'rent' ? 'Rent' : 'Sale';
    setActive(value);
    onToggle(listingType);
  };

  return (
    <div className="toggle-button">
      <button
        className={active === 'rent' ? 'active' : ''}
        onClick={() => handleToggle('rent')}
      >
        Rent
      </button>
      <button
        className={active === 'sale' ? 'active' : ''}
        onClick={() => handleToggle('sale')}
      >
        Buy
      </button>
    </div>
  );
};

export default ToggleButton;