import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchBookings = async () => {
  const response = await axios.get(`${API_BASE}/bookings`);
  return response.data;
};

export const getStylists = async () => {
  const response = await axios.get(`${API_BASE}/stylists`);
  return response.data;
};

export const createStylist = async (stylistData) => {
  const response = await axios.post(`${API_BASE}/admin/add-stylist`, {
    username: stylistData.username,
    password: stylistData.password,
    expertise: stylistData.expertise,
    availability: stylistData.availability
  });
  return response.data;
};

export const getReports = async () => {
  const response = await axios.get(`${API_BASE}/reports`);
  return response.data;
};

export const deleteStylist = async (id) => {
  const response = await axios.delete(`${API_BASE}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

// Add more API calls as needed
