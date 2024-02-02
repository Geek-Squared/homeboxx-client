import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.scss';
import { useStore } from '../customHooks/auth';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

const Profile: React.FC = () => {
    const [__, setUser] = useState<User | null>(null);
    const { user, getUser } = useStore();

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get<User>('https://jsonplaceholder.typicode.com/users/1');
            setUser(response.data);
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    console.log('userprofile', user);

    return (
        <div className="profile">
            <h3>Profile</h3>
            <img src="https://via.placeholder.com/150" alt="Profile" />
            <h2>{user?.firstName} {user?.lastName}</h2>
            <p>{user?.email}</p>
            <div className="card">
                <div className="card-content">
                    <div className="card-section">
                        <h3>10</h3>
                        <p>Property Listed</p>
                    </div>
                    <div className="divider" />
                    <div className="card-section">
                        <h3>5</h3>
                        <p>Properties Saved</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        window.location.href = '/add-property';
                    }}
                >Add A New Listing</button>
            </div>
        </div>
    );
};

export default Profile;