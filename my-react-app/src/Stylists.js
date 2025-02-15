import React, { useState, useEffect } from 'react';
import StylistForm from './StylistForm';
import { getStylists, createStylist } from './services/api';

export default function Stylists() {
  const [stylists, setStylists] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadStylists();
  }, []);

  const loadStylists = async () => {
    const data = await getStylists();
    setStylists(data);
  };

  const handleAddStylist = async (stylistData) => {
    await createStylist(stylistData);
    loadStylists();
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add New Stylist</button>
      {showForm && <StylistForm onSubmit={handleAddStylist} />}
      <div className="stylist-list">
        {stylists.map(stylist => (
          <div key={stylist.id} className="stylist-card">
            <h3>{stylist.name}</h3>
            <p>Specialty: {stylist.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
