// ListingDetail.tsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faHouse } from '@fortawesome/free-solid-svg-icons';
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './styles.scss';
// import Features from './features';
import { useParams } from 'react-router-dom';
import { useListingStore } from '../customHooks/listing';
import Map from './map';
import { useLocationStore } from '../customHooks/useSearchLocation';
import Tag from './tag';
import Header from './header';
import ContactFooter from './footer/contactFooter';


interface ListingDetailProps {
    title?: string;
    price?: number;
    location?: string;
    description?: string;
    imageUrl?: string;
    beds?: number;
    baths?: number;
    amenities?: string[];
}

const ListingDetail: React.FC<ListingDetailProps> = ({ title }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const fetchListing = useListingStore(state => state.fetchAllListings);
    const listings = useListingStore(state => state.listings);
    const getLocation = useLocationStore(state => state.getLocation);
    const [locationData, setLocationData] = useState<any>({});
    const { id } = useParams<{ id: string }>();
    const toggleDescription = () => setIsExpanded(!isExpanded);
    const listing: any = listings.find(listing => listing._id === id);
    const shortDescription = `${listing?.description.substring(0, 600)}...`;

    useEffect(() => {
        fetchListing();
    }, [id]);

    useEffect(() => {
        if (listing?.location) {
            getLocation(listing.location).then(setLocationData);
        }
    }, [listing, getLocation]);


    return (
        <>
        <Header />
        <div className="listing-detail">
            <div className="image-container">
                <img src={listing?.imageUrl[0]} alt={title} className="main-image" />
                <div className="features">
                    {
                        listing?.propertyType === "Land" || listing?.propertyType === "Stand" || listing?.propertyType === "Farm" || listing?.propertyType === "Industrial Area" ||
                            listing?.propertyType === "Commercial Property" ? (
                            <>
                                <div className="feature">
                                    <FontAwesomeIcon icon={faHouse} />
                                    <span>{listing?.propertyArea} {listing?.propertyAreaUnit}</span>
                                </div>
                            </>
                        ) : (
                            <>

                                <div className="feature">
                                    <FontAwesomeIcon icon={faBed} />
                                    <span>{listing?.bedrooms} bed</span>
                                </div>
                                <div className="feature">
                                    <FontAwesomeIcon icon={faBath} />
                                    <span>{listing?.bathrooms} bath</span>
                                </div>

                            </>
                        )
                    }

                </div>
            </div>
            <div className="info-section">
                <div className="title-price">
                    <h2 className="title">{listing?.title}</h2>
                    <p className="price">${listing?.price.toLocaleString()}</p>
                </div>
                <div className="location-permonth">
                    <p className="location">{listing?.location}</p>
                    {
                        listing?.listingType === 'Rent' ? <p className="permonth">/per month</p> : null
                    }
                </div>


                <div className="description-container">
                    <p className="description">
                        {isExpanded ? listing?.description : shortDescription}
                        {listing?.description && listing?.description.length > 150 && (
                            <span onClick={toggleDescription} className={`read-more ${isExpanded ? 'expanded' : ''}`}>
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {/* <div className="amenity-title">
                <h2 className="title">Amenities</h2>
            </div> */}

            <div className="amenities">
                {listing?.amenities.flatMap((amenity: any) => amenity.split(',')).map((amenity: any, index: any) => (
                    <Tag key={index} text={amenity.trim()} />
                ))}
            </div>

            <Map coordinates={locationData?.Place?.Geometry.Point} />
            {/* <div className="floating-icons">
                <FontAwesomeIcon icon={faEnvelope} className="envelope" size="2xl" />
                <FontAwesomeIcon icon={faWhatsapp} className="whatsapp" />
                <FontAwesomeIcon icon={faCommentDots} className="chat" />
            </div> */}
        </div>
        <ContactFooter />
        </>
    );
};

export default ListingDetail;