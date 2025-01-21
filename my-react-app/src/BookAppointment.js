import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookAppointment = () => {
    const [stylists, setStylists] = useState([]);
    const [selectedStylist, setSelectedStylist] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [stylistInfo, setStylistInfo] = useState(null);

    useEffect(() => {
        // Fetch stylist information from the server
        const fetchStylists = async () => {
            const response = await axios.get('http://localhost:3000/stylists');
            setStylists(response.data);
        };
        fetchStylists();
    }, []);

    const handleBooking = async (e) => {
        e.preventDefault();
        // Validate stylist availability here
        await axios.post('http://localhost:3000/book', { stylistId: selectedStylist, date, time });
        alert('Appointment booked successfully!');
    };

    const handleStylistChange = (e) => {
        const stylistId = e.target.value;
        setSelectedStylist(stylistId);
        // Fetch stylist details
        const stylist = stylists.find(stylist => stylist.id === stylistId);
        setStylistInfo(stylist);
    };

    const handlePayment = () => {
        const amount = document.getElementById('amount').value;
        const phone = document.getElementById('phone').value;

        if (!amount || !phone) {
            alert('Please enter both amount and phone number.');
            return;
        }

        fetch('http://localhost:3000/stkpush', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, phone })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    };

    return (
        <div>
            <form onSubmit={handleBooking} style={{ marginBottom: '2rem' }}>
                <h2>Book Appointment</h2>
                <select value={selectedStylist} onChange={handleStylistChange} required>
                    <option value="">Select Stylist</option>
                    {stylists.map(stylist => (
                        <option key={stylist.id} value={stylist.id}>{stylist.name}</option>
                    ))}
                </select>
                {stylistInfo && (
                    <div>
                        <h3>Stylist Information</h3>
                        <p>Expertise: {stylistInfo.expertise}</p>
                        <p>Availability: {stylistInfo.availability}</p>
                    </div>
                )}
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                <button type="submit">Book Appointment</button>
            </form>

            <div style={{ borderTop: '1px solid #ccc', paddingTop: '2rem' }}>
                <h2>Payment</h2>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
                        <div>Mpesa</div>
                        <div>Paypal</div>
                        <div>Card</div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <h6>Enter Amount & Number</h6>
                    </div>
                    <div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="amount">Amount</label>
                            <input type="text" id="amount" placeholder="Enter Amount" style={{ width: '100%' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" id="phone" placeholder="Enter Phone Number" style={{ width: '100%' }} />
                        </div>
                        <button 
                            type="button" 
                            onClick={handlePayment}
                            style={{ 
                                backgroundColor: '#28a745',
                                color: '#fff',
                                padding: '0.5rem 1rem',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Make Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
