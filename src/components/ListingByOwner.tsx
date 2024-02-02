import React, { useEffect } from 'react';
import { useListingStore } from '../customHooks/listing';
import './styles.scss';
import ListingCard from './cards/listing';
import { useNavigate } from 'react-router-dom';

const ListingByOwner: React.FC = () => {
    const fetchAllListings = useListingStore(state => state.fetchAllListings);
    const listings = useListingStore(state => state.listings);
    const navigate = useNavigate();
    const userID = sessionStorage.getItem('userID');

    const handleClick = (id: string) => {
        navigate(`/listing/${id}`);
    };

    useEffect(() => {
        fetchAllListings();
    }, [fetchAllListings]);

    // Filter the listings by the authenticated user
    const listingsByOwner = listings.filter((listing: any) => listing.owner === userID);

    console.log('byOwner', listingsByOwner);
    
    return (
        <div className='listing-container'>
         {listingsByOwner.map((listing: any) => (
                <ListingCard
                    key={listing?._id}
                    listing={{
                        image: listing.imageUrl.length > 0 && listing.imageUrl[0] || 'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                        location: listing.location.charAt(0).toUpperCase() + listing.location.slice(1),
                        title: listing.title,
                        price: listing.price.toString(
                        ).replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\B(?=(\d{5})+(?!\d))/g, ' '
                        ),
                        bathrooms: listing.bathrooms,
                        bedrooms: listing.bedrooms,
                        propertyArea: listing.propertyArea,

                    }}
                    onClick={() => handleClick(listing?._id)}
                />
            ))}
        </div>
    );
};

export default ListingByOwner;