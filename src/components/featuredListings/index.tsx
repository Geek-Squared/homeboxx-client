// FeaturedListings.tsx
import React from 'react';
import './styles.scss';
import ListingCard from '../cards/listing';
import { useNavigate } from 'react-router-dom';

interface IFeaturedListingsProps {
  listings: any[];
  searchTerm?: string;
  selectedTypes?: any;
}



const FeaturedListings: React.FC<IFeaturedListingsProps> = ({ listings, searchTerm, selectedTypes }) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/listing/${id}`);
  };

const filteredListings = searchTerm
? listings.filter(listing => listing.location.toLowerCase().includes(searchTerm.toLowerCase()) && selectedTypes.includes(listing.type))
: listings;

  return (
    <div className='featured-listings'>
      {filteredListings.map((listing: any) => (
        <ListingCard
          key={listing?._id}
          listing={{
            image: listing.imageUrl[0] || 'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location: listing.location.charAt(0).toUpperCase() + listing.location.slice(1),
            title: listing.title,
            price: listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\B(?=(\d{5})+(?!\d))/g, ' '),
            bathrooms: listing.bathrooms,
            bedrooms: listing.bedrooms,
            propertyArea: listing.propertyArea,
            propertyType: listing.propertyType,
          }}
          onClick={() => handleClick(listing?._id)}
        />
      ))}
    </div>
  );
};

export default FeaturedListings;