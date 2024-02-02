import create from 'zustand';
import axios from 'axios';

type Listing = {
      _id: any;
    listingType: string;
    location: string;
    propertyType: string;
    price: number;
    priceFrequency: string;
    bedrooms: number;
    bathrooms: number;
    lounges: number;
    title: string;
    description: string;
    propertyArea: number;
    imageUrl: string[];
};

type Store = {
    fetchListingByOwner: any;
    fetchAllListings: any;
    listings: Listing[];
    token: string | null;
    addListing: (formData: FormData) => Promise<void>;
    updateListing: (listing: Listing) => Promise<void>;
    deleteListing: (listingId: string) => Promise<void>;
};

const userToken = sessionStorage.getItem('token');

export const useListingStore = create<Store>((set, get) => ({

    listings: [],
    token: sessionStorage.getItem('token'),
    fetchAllListings: async () => {
        const response = await axios.get('http://localhost:5000/listing', {
            headers: {
                'x-access-token': userToken,
            },
        });
        set({ listings: response.data });
    },
    fetchListingByOwner: async (ownerId: string) => {
        const response = await axios.get(`http://localhost:5000/listing`, {
            headers: {
                'x-access-token': userToken,
            },
        });
        const listingsByOwner = response.data.filter((listing: { owner: string }) => listing.owner === ownerId);
        set({ listings: listingsByOwner });
    },
    fetchListingById: async (listingId: string) => {
        const response = await axios.get(`http://localhost:5000/listing/${listingId}`, {
            headers: {
                'x-access-token': userToken,
            },
        });
        set({ listings: response.data });
    },
    addListing: async (formData: FormData) => {
        const token = get().token;
        if (token === null) {
          throw new Error('Token is null');
        }
        const response = await axios.post('http://localhost:5000/listing', formData, {
          headers: {
            'x-access-token': userToken,
            'Content-Type': 'multipart/form-data',
          },
        });
        set((state) => ({ listings: [...state.listings, response.data] }));
      },
    updateListing: async (listing: any) => {
        const response = await axios.put(`http://localhost:5000/listing/${listing.id}`, listing, {
            headers: {
                'x-access-token': userToken,
            },
        });
        set((state) => ({
            listings: state.listings.map((item: any) => (item.id === listing.id ? response.data : item)),
        }));
    },
    deleteListing: async (listingId) => {
        await axios.delete(`http://localhost:5000/listing/${listingId}`, {
            headers: {
                'x-access-token': userToken,
            },
        });
        set((state) => ({ listings: state.listings.filter((item: any) => item.id !== listingId) }));
    },
}));