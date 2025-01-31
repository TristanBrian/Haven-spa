import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stylists = () => {
    const [stylists, setStylists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStylists = async () => {
            try {
                const response = await axios.get('/api/users?role=Stylist');
                setStylists(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchStylists();
    }, []);

    return (
        <div>
            <h1>Available Stylists</h1>
            {error && <p>Error fetching stylists: {error.message}</p>}
            <ul>
                {stylists.map(stylist => (
                    <li key={stylist.id}>{stylist.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Stylists;
