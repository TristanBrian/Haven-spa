import React, { useState } from 'react';
import { createStylist } from './services/api';

const StylistForm = ({ onStylistAdded }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [expertise, setExpertise] = useState('Hair Styling');
    const [availability, setAvailability] = useState('Mon-Fri 9AM-6PM');
    const [error, setError] = useState(null);

    const beautyServices = [
        'Hair Styling',
        'Hair Coloring',
        'Facial Treatments',
        'Manicure & Pedicure',
        'Waxing',
        'Makeup Artistry',
        'Massage Therapy'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const newStylist = {
                username,
                password,
                expertise,
                availability
            };
            
            await createStylist(newStylist);
            onStylistAdded();
            setUsername('');
            setPassword('');
            setExpertise('Hair Styling');
            setAvailability('Mon-Fri 9AM-6PM');
        } catch (err) {
            setError('Failed to add stylist. Please try again.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="stylist-form">
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="expertise">Expertise:</label>
                <select
                    id="expertise"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    required
                >
                    {beautyServices.map(service => (
                        <option key={service} value={service}>{service}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="availability">Availability:</label>
                <select
                    id="availability"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    required
                >
                    <option value="Mon-Fri 9AM-6PM">Weekdays (9AM-6PM)</option>
                    <option value="Sat-Sun 10AM-4PM">Weekends (10AM-4PM)</option>
                    <option value="Flexible">Flexible Hours</option>
                </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-button">
                Add Stylist
            </button>
        </form>
    );
};

export default StylistForm;
