import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookAppointment = () => {
    const [stylists, setStylists] = useState([]);
    const [selectedStylist, setSelectedStylist] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [status, setStatus] = useState('Scheduled');
    const [customerId, setCustomerId] = useState(1); // Placeholder for dynamic customer ID
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStylists = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/users?role=Stylist');
                setStylists(response.data);
            } catch (error) {
                setError('Failed to fetch stylists. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchStylists();
    }, []);

    const validateInputs = () => {
        if (!selectedStylist) {
            setError('Please select a stylist.');
            return false;
        }
        if (!serviceType) {
            setError('Please enter a service type.');
            return false;
        }
        if (!dateTime) {
            setError('Please select a date and time.');
            return false;
        }
        if (new Date(dateTime) < new Date()) {
            setError('Please select a future date and time.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const appointmentData = {
            customer_id: customerId,
            stylist_id: selectedStylist,
            date_time: dateTime,
            service_type: serviceType,
            status: status,
        };

        setLoading(true);
        try {
            await axios.post('/api/appointments', appointmentData);
            alert('Appointment booked successfully!');
            // Reset form
            setSelectedStylist('');
            setServiceType('');
            setDateTime('');
            setError('');
        } catch (error) {
            console.error('Error booking appointment:', error);
            setError('Failed to book appointment. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Book Appointment</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Booking...' : 'Book Appointment'}
                </button>
            </form>
        </div>
    );
};

export default BookAppointment;