// Header.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

interface IHeaderProps {
    hideLogo?: boolean;
    children?: any;
}

const Header: React.FC<IHeaderProps> = ({ hideLogo, children }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const openDropdown = () => {
        setDropdownOpen(true);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <header className='header'>
            <div className='menu-icon' onClick={openDropdown}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            {dropdownOpen && (
                <div className='dropdown-menu'>
                    <FontAwesomeIcon icon={faTimes} className='close-icon' onClick={closeDropdown} />
                    <a href='/listings'>Buy</a>
                    <a href='/listings'>Rent</a>
                    <a href='/register'>List your property</a>
                    <a href='/my-listings'>Rental Manager</a>
                    <a href='/login'>Login</a>
                </div>
            )}
            {!hideLogo && <h1 className='logo'>Homeboxx</h1>}
            {hideLogo && children}
            <FontAwesomeIcon icon={faBell} className='profile-icon' />
        </header>
    );
};

export default Header;