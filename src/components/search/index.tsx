import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import ToggleButton from '../buttons/toggle';
import { useLocationStore } from '../../customHooks/useSearchLocation';

interface ISearchBoxProps {
  onSearch?: (term: string) => void;
  onToggle?: (active: string) => void;
  isScrolling?: boolean;
  showToggle?: boolean;
  setSearchTerm?: any;
}

const SearchBox: React.FC<ISearchBoxProps> = ({ onSearch, onToggle, isScrolling, showToggle, setSearchTerm }) => {
  const [term, setTerm] = useState('');
  const { searchLocation } = useLocationStore();
  const location = useLocationStore(state => state.location);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // function to handle search
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    //@ts-ignore
    onSearch(term, event);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    if (newTerm) {
      searchLocation(newTerm);
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  const handleSuggestionClick = (label: string) => {
    setSearchTerm(label);
    if (onSearch) {
      onSearch(label);
    }
    setDropdownOpen(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        {
          //@ts-ignore
          showToggle === false || isScrolling ? null : <ToggleButton onToggle={onToggle} />
        }

        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Enter Property Location"
            value={term}
            onChange={handleInputChange}
          />

          {dropdownOpen && term && location && (
            <div className="suggestions">
              {
              //@ts-ignore
              location.map((loc, index) => (
                <div key={index} onClick={() => handleSuggestionClick(loc.Place.Neighborhood)}>
                  {loc.Place.Neighborhood}
                </div>
              ))}
            </div>
          )}

          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;