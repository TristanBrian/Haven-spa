import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StylistDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await axios.get('/api/appointments?user_id=2'); // Replace with actual stylist ID
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
                        {appointment.service_type} with Customer ID: {appointment.customer_id} on {appointment.date_time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StylistDashboard;
