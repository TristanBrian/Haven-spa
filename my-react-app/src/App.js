import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import HomePage from './HomePage'; // Import the new HomePage component
import Login from './Login';
import UserList from './UserList'; // Import the new UserList component
import BookAppointment from './BookAppointment';
import Stylists from './Stylists';
import AdminDashboard from './AdminDashboard';
import StylistDashboard from './StylistDashboard';
import CustomerDashboard from './CustomerDashboard';

const App = () => {
    return (
        <div>
            <h1>Beauty Parlour and Spa</h1>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UserList />} /> {/* New route for UserList */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path = "/stylist" element={<StylistDashboard/>}/>
                <Route path ="/customer" element={<CustomerDashboard/>}/>
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/stylists" element={<Stylists />} />

                {/* Add other routes here */}
<Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    );
};

export default App;