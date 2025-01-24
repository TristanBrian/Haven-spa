// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Import the App component

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in Router
root.render(
  <Router>
    <App />
  </Router>
);