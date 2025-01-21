import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [stylists, setStylists] = useState([]);
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [availability, setAvailability] = useState('');

    useEffect(() => {
        const fetchStylists = async () => {
            const response = await axios.get('http://localhost:3000/stylists');
            setStylists(response.data);
        };
        fetchStylists();
    }, []);

    const handleAddStylist = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/stylists', { name, expertise, availability });
        setName('');
        setExpertise('');
        setAvailability('');
        // Refresh stylist list
        const response = await axios.get('http://localhost:3000/stylists');
        setStylists(response.data);
    };

    const handleDeleteStylist = async (id) => {
        await axios.delete(`http://localhost:3000/stylists/${id}`);
        // Refresh stylist list
        const response = await axios.get('http://localhost:3000/stylists');
        setStylists(response.data);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Manage stylists and view registered users here.</p>
            <form onSubmit={handleAddStylist}>
                <input type="text" placeholder="Stylist Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Expertise" value={expertise} onChange={(e) => setExpertise(e.target.value)} required />
                <input type="text" placeholder="Availability" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
                <button type="submit">Add Stylist</button>
            </form>
            <h2>Stylists List</h2>
            <ul>
                {stylists.map(stylist => (
                    <li key={stylist.id}>
                        {stylist.name} - {stylist.expertise} - {stylist.availability}
                        <button onClick={() => handleDeleteStylist(stylist.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
