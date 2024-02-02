// AddProperty.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import ListingByOwner from './ListingByOwner';
import SearchBox from './search';

const MyProperties: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
        <Header hideLogo={false} />
            <div className="add-property">
                <h2>Your Listed Properties</h2>
                <button className="add-property-button" onClick={() => navigate('/add-property')}>
                    <FontAwesomeIcon icon={faPlus} /> Add Property
                </button>
            </div>
            <div style={{
                marginTop: "-5%"
            }}>

            <SearchBox showToggle={false} />
            </div>
            {/* <p className='add-prop-text'>Start listing your properties today and reach potential buyers or renters.</p> */}
            <ListingByOwner />
        </>
    );
};

export default MyProperties;