import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ isAdmin, handleLogin, handleLogout }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        {/* Placeholder SOHC Logo */}
        <Link to="/" className={styles.logo}>
          [ SOHC ]
        </Link>
      </div>
      
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>UPCOMING SHOWS</Link>
        <Link to="/past" className={styles.navLink}>PAST SHOWS</Link>
        
        {/* Only show "Add Show" link if logged in */}
        {isAdmin && <Link to="/admin/add" className={styles.adminAdd}>ADD GIG</Link>}
        
        {/* Secret Login Trigger: Click the copyright 3 times */}
        <span 
          onClick={(e) => e.detail === 3 ? handleLogin() : null} 
          className={styles.copyright}
        >
          © 2026 SOHC
        </span>

        {isAdmin && (
          <button onClick={handleLogout} className={styles.logoutBtn}>
            LOGOUT
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
