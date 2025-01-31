import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await axios.get('/api/appointments?user_id=1'); // Replace with actual user ID
            setAppointments(response.data);
        };
        fetchAppointments();
    }, []);

    return (
        <div>
            <h1>Your Appointments</h1>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.appointment_id}>
                        {appointment.service_type} with Stylist ID: {appointment.stylist_id} on {appointment.date_time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerDashboard;
