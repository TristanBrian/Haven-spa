import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [bookedAppointments, setBookedAppointments] = useState([]);

    useEffect(() => {
        const fetchBookedAppointments = async () => {
            const response = await axios.get('/api/appointments?user_id=1'); // Replace with actual user ID
            setBookedAppointments(response.data);
        };
        fetchBookedAppointments();
    }, []);

    return (
        <div>
            <h1>Booked Appointments</h1>
            <ul>
                {bookedAppointments.map(appointment => (
                    <li key={appointment.appointment_id}>
                        {appointment.service_type} with Stylist ID: {appointment.stylist_id} on {appointment.date_time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
