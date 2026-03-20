import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page logic
import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';
import AdminAdd from './pages/AdminAdd'; // We'll build the logic for this next

import Navbar from './components/Navbar';
import BackgroundVideo from './components/BackgroundVideo';

function App() {
  // Logic: Check if we have a password saved locally to show "Admin Mode" status
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminPassword'));

  // Logic: The "Secret" Login function
  const handleLogin = () => {
    const pwd = prompt("SOHC ADMIN ACCESS:");
    if (pwd) {
      localStorage.setItem('adminPassword', pwd);
      setIsAdmin(true);
      alert("Credentials stored. You can now delete/create shows.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminPassword');
    setIsAdmin(false);
    alert("Logged out.");
  };

  return (
    <Router>
      {/* Modular Background Video */}
      <BackgroundVideo />

      <div className="app-container">
        
        {/* Modular Navigation Bar */}
        <Navbar 
          isAdmin={isAdmin} 
          handleLogin={handleLogin} 
          handleLogout={handleLogout} 
        />

        {/* The Route Switcher wrapped in padding */}
        <div className="app-content">
          <Routes>
            {/* Home Page: Shows the list of flyers */}
            <Route path="/" element={<Home isAdmin={isAdmin} />} />

            {/* Detail Page: Shows band info and Spotify tracks */}
            <Route path="/show/:id" element={<ShowDetail />} />

            {/* Admin Page: The form to create new shows */}
            <Route path="/admin/add" element={<AdminAdd />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;