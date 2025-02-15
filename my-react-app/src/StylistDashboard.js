import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StylistDashboard = () => {
    const [schedule, setSchedule] = useState([]);
    const [availability, setAvailability] = useState('');

    useEffect(() => {
        const fetchSchedule = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:5000/api/schedule/${user.username}`);
            setSchedule(response.data);
        };
        fetchSchedule();
    }, []);

    const handleUpdateAvailability = async () => {
        await axios.put(`http://localhost:5000/api/stylists/availability`, {
            availability,
            stylistId: JSON.parse(localStorage.getItem('user')).username
        });
    };

    return (
        <div className="dashboard">
            <h1>Stylist Portal</h1>
            
            {/* Availability Update */}
            <div className="availability-section">
                <h2>Update Availability</h2>
                <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="Mon-Fri 9AM-5PM"
                />
                <button onClick={handleUpdateAvailability}>Update</button>
            </div>

            {/* Upcoming Appointments */}
            <div className="schedule">
                <h2>Your Schedule</h2>
                {schedule.map(appointment => (
                    <div key={appointment.id} className="appointment">
                        <p>Client: {appointment.customerName}</p>
                        <p>Service: {appointment.service}</p>
                        <p>Time: {new Date(appointment.dateTime).toLocaleTimeString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StylistDashboard;
