import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await axios.get('http://localhost:3000/appointments');
            setAppointments(response.data);
        };
        const fetchBookingHistory = async () => {
            const response = await axios.get('http://localhost:3000/booking-history');
            setBookingHistory(response.data);
        };
        fetchAppointments();
        fetchBookingHistory();
    }, []);

    return (
        <div>
            <h1>Customer Dashboard</h1>
            <p>Book appointments and view your history here.</p>
            <h2>Upcoming Appointments</h2>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        {appointment.stylistName} - {appointment.date} at {appointment.time}
                    </li>
                ))}
            </ul>
            <h2>Booking History</h2>
            <ul>
                {bookingHistory.map(history => (
                    <li key={history.id}>
                        {history.stylistName} - {history.date} at {history.time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerDashboard;
