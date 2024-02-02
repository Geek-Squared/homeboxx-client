import create from 'zustand';
import axios from 'axios';

type Location = {
  name: string;
  country: string;
};

type LocationStore = {
  location: Location | null;
  locations: Location[];
  searchLocation: (query: string) => Promise<void>;
  getLocations: () => Promise<void>;
  getLocation: (place: string) => Promise<Location | null>;
};

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  locations: [],
  searchLocation: async (query) => {
    try {
      const response = await axios.post(`http://localhost:5000/location/search?query=${query}`);
      const filteredLocations = response.data.Results.filter((location: any) => location.Place.Country === 'ZWE');
      set({ location: filteredLocations });
    } catch (error) {
      console.error('Failed to search location:', error);
    }
  },
  getLocations: async () => {
    try {
      const response = await axios.get('http://localhost:5000/location');
      set({ locations: response.data });
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  },
  getLocation: async (place) => {
    try {
      const response = await axios.post(`http://localhost:5000/location/search?query=${place}`);
      const filteredLocations = response.data.Results.filter((location: any) => location.Place.Country === 'ZWE');
      return filteredLocations[0] || null;
    } catch (error) {
      console.error('Failed to get location:', error);
      return null;
    }
  },
}));