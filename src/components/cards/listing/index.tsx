// ListingCard.tsx
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

interface IListing {
  listing: {
    image: any;
    location: string;
    title: string;
    price: string;
    listingType?: string;
    bedrooms: number;
    bathrooms: number;
    propertyArea: number;
    propertyType?: string;
  },
  onClick?: any;
};

const ListingCard: FC<IListing> = ({ listing, onClick }) => {
  
  return (
    <div className="listing-card">
      <div className="image-container">
        <img src={listing.image} alt="House" />
        <FontAwesomeIcon icon={faHeart} className="favourite-icon" />
      </div>
      <div className="details" onClick={onClick}>
        <p className='price-text'>USD${listing.price}</p>
        {
          listing.listingType === 'Rent' ? <p>/month</p> : null
        }
        <p>{listing?.bedrooms} beds | {listing.bathrooms} baths | {listing.propertyArea}sqm</p>
        <p>{listing.location}</p>       
        <p className="listed-by">Listed by Harcouts</p>
      </div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmJ8eIAx3PNYiDkoSCz2xOezC5MivjjOdELvPRE1eSQclfrEbTPIglq8w_8vgHUADC3OI&usqp=CAU" alt="Real Estate Logo" className="logo" />
    </div>
  );
};

export default ListingCard;