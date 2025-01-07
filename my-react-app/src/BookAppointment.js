import React, { useState } from 'react';
import axios from 'axios';

const BookAppointment = () => {
    const [stylistId, setStylistId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleBooking = async (e) => {
        e.preventDefault();
        await axios.post('https://yourdomain.com/book', { stylistId, date, time });
        alert('Appointment booked successfully!');
    };

    return (
        <form onSubmit={handleBooking}>
            <input type="text" placeholder="Stylist ID" value={stylistId} onChange={(e) => setStylistId(e.target.value)} required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            <button type="submit">Book Appointment</button>
        </form>
    );
};

export default BookAppointment;