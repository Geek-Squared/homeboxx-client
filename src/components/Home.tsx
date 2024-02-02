// Home.tsx
import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import HamburgerMenu from './menu/HamburgerMenu';
import SearchBox from './search';
import PropertyTypeButtons from './propertyTypes';
import Listing from './Listings';
// import { BottomSheet } from 'react-spring-bottom-sheet'
// import Filter from './filter';
import FeaturedListings from './featuredListings';
import { useListingStore } from '../customHooks/listing';
import Header from './header';
// import { useLocationStore } from '../customHooks/useSearchLocation';

const Home: React.FC = () => {
  // const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [listingType, setListingType] = useState('rent');
  const [hasSearchedOrFiltered, setHasSearchedOrFiltered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const fetchAllListings = useListingStore(state => state.fetchAllListings);
  const listings = useListingStore(state => state.listings);
  // const locationItems = useLocationStore(state => state.location);

  useEffect(() => {
    fetchAllListings();
  }, [fetchAllListings]);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (show !== isScrolled) {
        setIsScrolled(show);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  const handleSearch = (term: string, event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    console.log('from here', term);
    // setSearchTerm(term);
    setHasSearchedOrFiltered(true);
  };

  const handleToggle = (active: string) => {
    setListingType(active);
  };

  const handleTypeSelect = (types: string[]) => {
    setSelectedTypes(types);
    setHasSearchedOrFiltered(true);
  };

  const featuredListings = listings.slice(0, 3);
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      marginTop: "-20%",
    }}>
      <Header hideLogo={isScrolled}>
        {isScrolled && <SearchBox onSearch={handleSearch} onToggle={handleToggle} isScrolling={isScrolled} setSearchTerm={setSearchTerm}  />}
      </Header>
      <div className='sticky-header'>
        {!isScrolled && <SearchBox onSearch={handleSearch} onToggle={handleToggle} />}
        <PropertyTypeButtons onTypeSelect={handleTypeSelect} />
      </div>
      <div style={{
        marginBottom: "10%",
      }} />
      {hasSearchedOrFiltered ? (
        <Listing searchTerm={searchTerm} selectedTypes={selectedTypes} listingType={listingType} />
      ) : (
        <div className='featured-listing-container'>
          <h3 className='featured-text'>Featured Listings</h3>
          <FeaturedListings listings={featuredListings} searchTerm={searchTerm} selectedTypes={selectedTypes} />
        </div>
      )}
    </div>
  );
};

export default Home;