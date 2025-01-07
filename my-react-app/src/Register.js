import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:5000/register', { name, email });
        alert('Registration successful!');
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;