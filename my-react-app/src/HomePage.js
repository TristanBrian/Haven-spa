import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const images = ['/back1.jpg', '/back2.jpg', '/back3.jpg','/back4.jpg','/back5.jpg'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleBookNow = () => {
        navigate('/book-appointment');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="home-page">
            <nav className="navbar">
                <img src="/logo1.jpg" alt="Haven Beauty" className="logo"/> 
                <ul>
                    <li><a onClick={() => navigate('/')}>Home</a></li>
                    <li><a href="/">Services</a></li>
                    <li><a onClick={handleBookNow}>Book Now</a></li>
                    <li><a href="/">Blogs</a></li>
                    <li><a href="/">Contacts</a></li>
                </ul>
            </nav>
            <div className="hero-section" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
                <h2 className="animated-text">Welcome to Haven Beauty Parlour and Spa</h2>
                <p>Experience the ultimate relaxation and beauty treatments.</p>
                <p>Book your appointment today!</p>
                <button className="cta-button" onClick={handleBookNow}>Book Now</button>
            </div>
        
            <h2> Our Services</h2>
            <div className="product-shelf">
                <div className="product-card"> 
                    <img src="/cat1.jpg" alt="spa" className="product-image" />
                    <div className="product title">Relaxing Spa Treatment</div>
                    <p className="product-description">A soothing experience to rejuvenate your body and mind.</p>
                    <div className="product-price">Ksh 2500</div>
                    <button className="buy-button" onClick={handleBookNow}>Book Now</button>              
                </div>
                <div className="product-card"> 
                    <img src="/cat2.jpg" alt="nails" className="product-image"/>
                    <div className="product title">Nail Art</div>
                    <p className="product-description">Creative designs to enhance your nails.</p>
                    <div className="product-price">Ksh 2500</div> 
                    <button className="buy-button" onClick={handleBookNow}>Book Now</button>              
                </div>
                <div className="product-card"> 
                    <img src="/cat3.jpg" alt="product 3" className="product-image" />
                    <div className="product title">Facial Treatment</div>
                    <p className="product-description">Revitalize your skin with our facial services.</p>
                    <div className="product-price">Ksh 2500</div> 
                    <button className="buy-button" onClick={handleBookNow}>Book Now</button>              
                </div>
                <div className="product-card"> 
                    <img src="/cat4.jpg" alt="product 4" className="product-image" />
                    <div className="product title">Hair Styling</div>
                    <p className="product-description">Professional hair styling for any occasion.</p>
                    <div className="product-price">Ksh 2500</div> 
                    <button className="buy-button" onClick={handleBookNow}>Book Now</button>              
                </div>
                <div className="product-card"> 
                    <img src="/cat5.jpg" alt="product 5" className="product-image" />
                    <div className="product title">Massage Therapy</div>
                    <p className="product-description">Relax and unwind with our massage therapy.</p>
                    <div className="product-price">Ksh 2500</div> 
                    <button className="buy-button" onClick={handleBookNow}>Book Now</button>              
                </div>
            </div>
            <div className="button-container">
                <button className="reg-button" onClick={handleRegister}>Register</button>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default HomePage;
