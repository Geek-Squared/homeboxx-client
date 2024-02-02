// PropertyTypeButtons.tsx
import React, { useState } from 'react';
import './styles.scss';
import { propertyTypes } from '../../constants';

interface IPropertyTypeButtonsProps {
  onTypeSelect: (types: string[]) => void;
}

const PropertyTypeButtons: React.FC<IPropertyTypeButtonsProps> = ({ onTypeSelect }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleButtonClick = (type: string) => {
    const newSelectedTypes = selectedTypes.includes(type) ? selectedTypes.filter(t => t !== type) : [...selectedTypes, type];
    setSelectedTypes(newSelectedTypes);
    onTypeSelect(newSelectedTypes);
  };

  return (
    <div className="property-type-buttons">
      {propertyTypes.map((type, index) => (
        <button
          key={index}
          className={`property-type-button ${selectedTypes.includes(type) ? 'selected' : ''}`}
          onClick={() => handleButtonClick(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default PropertyTypeButtons;