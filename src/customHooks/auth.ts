import create from 'zustand';
import axios from 'axios';

type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

type Store = {
  user: User | null;
  users: User[];
  token: string | null;
  login: (values: { username: string; password: string }) => Promise<void>;
  register: (values: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<void>;
  getUsers: () => Promise<void>;
};

export const useStore = create<Store>((set) => ({
  user: null,
  users: [],
  token: null,
  login: async (values) => {
    const response = await axios.post('http://localhost:5000/user/login', values);
    const token = response.data.token;
    sessionStorage.setItem('token', token);
    set({ user: response.data, token });
    sessionStorage.setItem('userID', response.data.userId);
  },
  register: async (values) => {
    const response = await axios.post('http://localhost:5000/user/register', values);
    set({ user: response.data });
  },
  logout: () => {
    sessionStorage.removeItem('token');
    set({ user: null, token: null })
  },
  getUser: async () => {
    try {
      const userID = sessionStorage.getItem('userID');
      const response = await axios.get(`http://localhost:5000/user/${userID}`);
      set({ user: response.data });
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  },
  getUsers: async () => {
    try {
      const response = await axios.get('http://localhost:5000/user');
      set({ users: response.data });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  },
}));