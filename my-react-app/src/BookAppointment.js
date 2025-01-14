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
                <input type="text" placeholder="Stylist ID" value={stylistId} onChange={(e) => setStylistId(e.target.value)} required />
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
