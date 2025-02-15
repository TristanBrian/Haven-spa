import React, { useState, useEffect } from 'react';
import { getStylists, createStylist, getReports, deleteStylist } from './services/api';

const AdminDashboard = () => {
    const [stylists, setStylists] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [username, setUsername] = useState('');
    const [expertise, setExpertise] = useState('Hair Styling');
    const [availability, setAvailability] = useState('');

    const beautyServices = [
        'Hair Styling',
        'Hair Coloring',
        'Facial Treatments',
        'Manicure & Pedicure',
        'Waxing',
        'Makeup Artistry',
        'Massage Therapy'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReports();
                // Map stylists to include id and username
                const formattedStylists = response.stylists.map(stylist => ({
                    id: stylist[0],
                    username: stylist[1]
                }));
                setStylists(formattedStylists);
                
                // Map customers to include id and username
                const formattedCustomers = response.users
                    .filter(user => user[2] === 'customer')
                    .map(customer => ({
                        id: customer[0],
                        username: customer[1]
                    }));
                setCustomers(formattedCustomers);
                
                setAppointments(response.appointments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleAddStylist = async (e) => {
        e.preventDefault();
        try {
            await createStylist({
                username,
                expertise,
                availability,
                role: 'stylist'
            });
            // Refresh data
            const response = await getReports();
            setStylists(response.stylists);
            setUsername('');
            setExpertise('Hair Styling');
            setAvailability('');
        } catch (error) {
            console.error('Error adding stylist:', error);
        }
    };

    const handleDeleteCustomer = async (id) => {
        try {
            if (!id) {
                throw new Error('Customer ID is undefined');
            }
            await deleteStylist(id);
            setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleDeleteStylist = async (id) => {
        try {
            if (!id) {
                throw new Error('Stylist ID is undefined');
            }
            await deleteStylist(id);
            setStylists(prevStylists => prevStylists.filter(stylist => stylist.id !== id));
        } catch (error) {
            console.error('Error deleting stylist:', error);
        }
    };

    const formatDateTime = (dateString) => {
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="admin-dashboard container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Beauty Parlour Admin Dashboard</h1>
            
            {/* Add Stylist Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Stylist</h2>
                <form onSubmit={handleAddStylist} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Stylist Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <select
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        className="p-2 border rounded"
                        required
                    >
                        {beautyServices.map(service => (
                            <option key={service} value={service}>{service}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Availability (e.g., Mon-Fri 9AM-6PM)"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Add Stylist
                    </button>
                </form>
            </div>

            {/* Stylists List */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Stylists ({stylists.length})</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Expertise</th>
                                <th className="p-3 text-left">Availability</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stylists.map((stylist, index) => (
                                <tr key={`stylist-${stylist.id || index}`} className="border-t">
                                    <td className="p-3">{stylist.username || 'N/A'}</td>
                                    <td className="p-3">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            {stylist.expertise}
                                        </span>
                                    </td>
                                    <td className="p-3">{stylist.availability}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDeleteStylist(stylist.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Upcoming Appointments ({appointments.length})</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-left">Date & Time</th>
                                <th className="p-3 text-left">Customer</th>
                                <th className="p-3 text-left">Stylist</th>
                                <th className="p-3 text-left">Service</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => {
                                const customer = customers.find(c => c.id === appointment.customer_id);
                                const stylist = stylists.find(s => s.id === appointment.stylist_id);
                                return (
                                    <tr key={`appointment-${appointment.appointment_id}`} className="border-t">
                                        <td className="p-3">{formatDateTime(appointment.date_time)}</td>
                                        <td className="p-3">{customer?.username || 'N/A'}</td>
                                        <td className="p-3">{stylist?.username || 'N/A'}</td>
                                        <td className="p-3">{appointment.service_type}</td>
                                        <td className="p-3">
                                            <span className="bg-green-100 text-green-800 px 2 py-1 rounded">
                                                {appointment.status || 'Confirmed'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customers List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Registered Customers ({customers.length})</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Appointments</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={`customer-${customer.id}`} className="border-t">
                                    <td className="p-3">{customer.id}</td>
                                    <td className="p-3">{customer.username}</td>
                                    <td className="p-3">{customer.email}</td>
                                    <td className="p-3">{customer.phone || 'N/A'}</td>
                                    <td className="p-3">
                                        {appointments.filter(a => a.customer_id === customer.id).length}
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDeleteCustomer(customer.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
