import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedService, setSelectedService] = useState('Haircut');
    const [selectedDateTime, setSelectedDateTime] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:5000/api/appointments/${user.username}`);
            setAppointments(response.data);
        };
        fetchAppointments();
    }, []);

    const handleBookAppointment = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        
        await axios.post('http://localhost:5000/api/appointments', {
            service: selectedService,
            dateTime: selectedDateTime,
            customerId: user.username
        });
        // Refresh appointments
    };

    return (
        <div className="dashboard">
            <h1>Welcome, {JSON.parse(localStorage.getItem('user')).username}</h1>
            
            {/* Book Appointment Section */}
            <div className="booking-section">
                <h2>Book New Appointment</h2>
                <form onSubmit={handleBookAppointment}>
                    <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                        <option value="Haircut">Haircut</option>
                        <option value="Coloring">Coloring</option>
                        <option value="Facial">Facial Treatment</option>
                    </select>
                    <input
                        type="datetime-local"
                        value={selectedDateTime}
                        onChange={(e) => setSelectedDateTime(e.target.value)}
                        required
                    />
                    <button type="submit">Book Now</button>
                </form>
            </div>

            {/* Appointments List */}
            <div className="appointments-list">
                <h2>Your Appointments</h2>
                {appointments.map(appointment => (
                    <div key={appointment.id} className="appointment-card">
                        <p>Service: {appointment.service}</p>
                        <p>Date: {new Date(appointment.dateTime).toLocaleString()}</p>
                        <p>Status: {appointment.status}</p>
                        <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerDashboard;
