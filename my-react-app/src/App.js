import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Register'; // Ensure the path is correct
import Login from './Login';
import BookAppointment from './BookAppointment';
import Stylists from './Stylists';

const App = () => {
    return (
        <div>
            <h1>Haven Beauty Parlour and Spa</h1>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/stylists" element={<Stylists />} />

                {/* Add other routes here */}
                <Route path="/" element={
                    <>
                        <h2>Welcome to Haven Beauty Parlour and Spa</h2>
                        <p>Please choose a service from the menu.</p>
                    </>
                } />
            </Routes>
        </div>
    );
};

export default App;