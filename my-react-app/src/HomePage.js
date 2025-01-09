import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

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
            <nav className="navbar">
                <img src="" alt="Haven Beauty"className="logo"/> 
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Services</a></li>
                    <li><a href="/">Book Now</a></li>
                    <li><a href="/">Blogs</a></li>
                    <li><a href="/">Contacts</a></li>
        <div/>
                 </ul>
            </nav>
            <div className="hero-section">
                <h2>Welcome to Haven Beauty Parlour and Spa</h2>
                <p>Experience the ultimate relaxation and beauty treatments.</p>
                <img src="back.jpg" alt="Spa" className="home-image" />
                <p>Book your appointment today!</p>
                <button className="cta-button">Book Now</button>
            </div>
            <div className="button-container">
                <button classname="reg-button" onClick={handleRegister}>Register</button>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default HomePage;
