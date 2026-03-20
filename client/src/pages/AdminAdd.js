import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createShow } from '../api';

const AdminAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    headliner: '',
    venue: '',
    date: '',
    description: '',
    flyer: '',
    spotifyArtistId: '',
    supports: '' // Logic: we store as string, then split into array on submit
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logic: Convert the comma-separated string into a clean array
    const showPayload = {
      ...formData,
      supports: formData.supports.split(',').map(band => band.trim()).filter(band => band !== "")
    };

    try {
      await createShow(showPayload);
      alert("Gig Posted to SOHC!");
      navigate('/'); // Logic: Send user back to homepage to see the new gig
    } catch (err) {
      console.error(err);
      alert("Post Failed: " + (err.response?.data?.message || "Check Admin Password"));
    }
  };

  return (
    <div className="admin-form">
      <h1>POST NEW GIG</h1>
      <form onSubmit={handleSubmit}>
        <input name="headliner" placeholder="Headliner" onChange={handleChange} required />
        <input name="venue" placeholder="Venue" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        
        {/* Support Bands Logic: Type them separated by commas */}
        <input 
          name="supports" 
          placeholder="Support Bands (comma separated: Band A, Band B)" 
          onChange={handleChange} 
        />

        <textarea name="description" placeholder="Gig Info / Set Times" onChange={handleChange} />
        <input name="flyer" placeholder="Flyer Image URL" onChange={handleChange} />
        <input name="spotifyArtistId" placeholder="Spotify Artist ID (for tracks)" onChange={handleChange} />

        <button type="submit">UPLOAD TO DATABASE</button>
      </form>
    </div>
  );
};

export default AdminAdd;