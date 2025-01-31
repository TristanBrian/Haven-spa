import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookAppointment = () => {
    const [stylists, setStylists] = useState([]);
    const [selectedStylist, setSelectedStylist] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [status, setStatus] = useState('Scheduled');

    useEffect(() => {
        // Fetch stylists from the API
        const fetchStylists = async () => {
            const response = await axios.get('/api/users?role=Stylist');
            setStylists(response.data);
        };
        fetchStylists();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointmentData = {
            customer_id: 1, // Replace with actual customer ID
            stylist_id: selectedStylist,
            date_time: dateTime,
            service_type: serviceType,
            status: status,
        };

        try {
            await axios.post('/api/appointments', appointmentData);
            alert('Appointment booked successfully!');
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment.');
        }
    };

    return (
        <div>
            <h1>Book Appointment</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Stylist:
                    <select value={selectedStylist} onChange={(e) => setSelectedStylist(e.target.value)} required>
                        <option value="">Select a stylist</option>
                        {stylists.map((stylist) => (
                            <option key={stylist.id} value={stylist.id}>
                                {stylist.username}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Service Type:
                    <input
                        type="text"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Date and Time:
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default BookAppointment;
