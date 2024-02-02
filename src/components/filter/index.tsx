// Filter.tsx
import React, { useState } from 'react';
// import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './styles.scss';

interface IFilterProps {
  onFilterChange: (filters: { minPrice: number, maxPrice: number, bedrooms: number, bathrooms: number }) => void;
}

const Filter: React.FC<IFilterProps> = ({ onFilterChange }) => {
  const [price, __] = useState({ min: 0, max: 1000 });
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  // const handlePriceChange = (value: any) => {
  //   setPrice(value);
  //   onFilterChange({ minPrice: value.min, maxPrice: value.max, bedrooms, bathrooms });
  // };

  const handleBedroomsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBedrooms(Number(event.target.value));
    onFilterChange({ minPrice: price.min, maxPrice: price.max, bedrooms: Number(event.target.value), bathrooms });
  };

  const handleBathroomsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBathrooms(Number(event.target.value));
    onFilterChange({ minPrice: price.min, maxPrice: price.max, bedrooms, bathrooms: Number(event.target.value) });
  };

  return (
    <div className="filter">
      <div className="filter-item">
        <label>Price Range:</label>
        {/* <InputRange
  minValue={Math.log(1000)}  // minimum price in logarithmic scale
  maxValue={Math.log(100000000)}  // maximum price in logarithmic scale
  value={{min: Math.log(price.min), max: Math.log(price.max)}}
  onChange={value => handlePriceChange({min: Math.exp(value.min), max: Math.exp(value.max)})}
  formatLabel={value => `$${Math.round(Math.exp(value))}`}
/> */}
      </div>
      <div className="filter-item">
        <label>Bedrooms:</label>
        <select value={bedrooms} onChange={handleBedroomsChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5+</option>
        </select>
      </div>
      <div className="filter-item">
        <label>Bathrooms:</label>
        <select value={bathrooms} onChange={handleBathroomsChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5+</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;