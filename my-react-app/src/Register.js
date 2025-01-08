import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Customer'); // State for user role
    const [message, setMessage] = useState(''); // State for success message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, role }), // Include role in request
        });
        const data = await response.json();
        if (response.ok) {
            setMessage('Registration successful!'); // Set success message
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after 2 seconds
            }, 2000);
        } else {
            setMessage(data.message); // Set error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Customer">Customer</option>
                <option value="Stylist">Stylist</option>
            </select>
            <button type="submit">Register</button>
            {message && <p>{message}</p>} {/* Display message */}
        </form>
    );
};

export default Register;
