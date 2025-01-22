import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import HomePage from './HomePage';
import Login from './Login';
import UserList from './UserList';
import BookAppointment from './BookAppointment';
import Stylists from './Stylists';
import AdminDashboard from './AdminDashboard';
import StylistDashboard from './StylistDashboard';
import CustomerDashboard from './CustomerDashboard';
import BookList from './BookList';
import BookDetails from './BookDetails';
import BookHistory from './BookHistory';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children; 
    }
}

const App = () => {
    return (
        <div className='main-header'>
            <h1>Beauty Parlour and Spa</h1>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/stylist" element={<StylistDashboard />} />
                <Route path="/customer" element={<CustomerDashboard />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/stylists" element={
                    <ErrorBoundary>
                        <Stylists />
                    </ErrorBoundary>
                } />
                <Route path="/book-list" element={<BookList />} />
                <Route path="/book-details" element={<BookDetails />} />
                <Route path="/book-history" element={<BookHistory />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    );
};

export default App; // Added default export
