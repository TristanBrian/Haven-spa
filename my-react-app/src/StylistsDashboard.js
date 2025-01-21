import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StylistsDashboard = () => {
    const [stylist, setStylist] = useState(null);
    const [expertise, setExpertise] = useState('');
    const [availability, setAvailability] = useState('');

    useEffect(() => {
        // Fetch stylist details from the server
        const fetchStylistDetails = async () => {
            const response = await axios.get('http://localhost:3000/stylist-details'); // Update with actual endpoint
            setStylist(response.data);
            setExpertise(response.data.expertise);
            setAvailability(response.data.availability);
        };
        fetchStylistDetails();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.put('http://localhost:3000/update-stylist', { expertise, availability }); // Update with actual endpoint
        alert('Stylist details updated successfully!');
    };

    return (
        <div>
            <h1>Stylist Dashboard</h1>
            {stylist && (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Expertise:</label>
                        <input type="text" value={expertise} onChange={(e) => setExpertise(e.target.value)} required />
                    </div>
                    <div>
                        <label>Availability:</label>
                        <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
                    </div>
                    <button type="submit">Update Details</button>
                </form>
            )}
        </div>
    );
};

export default StylistsDashboard;
