import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stylists = () => {
    const [stylists, setStylists] = useState([]);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchStylists = async () => {
            try {
                const response = await axios.get('http://localhost:5000/stylists');
                setStylists(response.data);
            } catch (err) {
                setError('Failed to fetch stylists.'); // Set error message
                console.error(err); // Log the error for debugging
            }
        };
        fetchStylists();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>} {/* Display error message if exists */}
            <ul>
                {stylists.map((stylist, index) => (
                    <li key={index}>
                        {stylist.name} - {stylist.expertise}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Stylists;