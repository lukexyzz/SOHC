import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page logic
import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';
import AdminAdd from './pages/AdminAdd'; // We'll build the logic for this next

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
      <div className="app-container">
        {/* Simple Navigation Logic */}
        <nav style={{ padding: '20px', borderBottom: '1px solid white' }}>
          <Link to="/" style={{ marginRight: '20px' }}>UPCOMING GIGS</Link>
          
          {/* Only show "Add Show" link if logged in */}
          {isAdmin && <Link to="/admin/add" style={{ color: 'red' }}>[ ADD GIG ]</Link>}
          
          {/* Secret Login Trigger: Click the copyright or a small dot 3 times */}
          <span 
            onClick={(e) => e.detail === 3 ? handleLogin() : null} 
            style={{ cursor: 'default', marginLeft: '20px', fontSize: '10px' }}
          >
            © 2026 SOHC
          </span>

          {isAdmin && (
            <button onClick={handleLogout} style={{ marginLeft: '10px', fontSize: '10px' }}>
              LOGOUT
            </button>
          )}
        </nav>

        {/* The Route Switcher */}
        <Routes>
          {/* Home Page: Shows the list of flyers */}
          <Route path="/" element={<Home isAdmin={isAdmin} />} />

          {/* Detail Page: Shows band info and Spotify tracks */}
          <Route path="/show/:id" element={<ShowDetail />} />

          {/* Admin Page: The form to create new shows */}
          <Route path="/admin/add" element={<AdminAdd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;