import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Assuming you will create a CSS file for styling

const HomePage = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="home-page">
            <h2>Welcome to Haven Beauty Parlour and Spa</h2>
            <p>Experience the ultimate relaxation and beauty treatments.</p>
            <img src="/path/to/your/image.jpg" alt="Spa" className="home-image" />
            <p>Book your appointment today!</p>
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default HomePage;
