// Listing.tsx
import React, { useEffect } from 'react';
import { useListingStore } from '../customHooks/listing';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import ListingCard from './cards/listing';

interface IListingProps {
  searchTerm?: string;
  selectedTypes?: string[];
  listingType?: string;
}

const Listing: React.FC<IListingProps> = ({ searchTerm, selectedTypes, listingType }) => {
  const fetchAllListings = useListingStore(state => state.fetchAllListings);
  const listings = useListingStore(state => state.listings);
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/listing/${id}`);
    console.log('id');
  };

  useEffect(() => {
    fetchAllListings();
  }, [fetchAllListings]);

  const filteredListings = listings.filter(listing =>
    //@ts-ignore
    listing.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //@ts-ignore
    (selectedTypes.length === 0 || selectedTypes.includes(listing.propertyType)) &&
    listing.listingType === listingType
  );

  console.log('filteredListings', filteredListings);

  return (
    <div className='listing-container'>
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

export default Listing;