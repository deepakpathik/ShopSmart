import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '1.5rem 2rem' }}>
      <nav style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '3rem', 
          padding: '1rem 2rem', 
          background: 'var(--surface-container-lowest)', 
          borderRadius: 'var(--radius-full)', 
          boxShadow: '0 4px 20px rgba(136,0,222,0.05)' 
        }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: 'var(--primary)' }}>
            ShopSmart
          </h2>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'var(--on-surface)', fontSize: '1rem', fontWeight: 700 }}>
            Login
          </Link>
          <Link to="/signup" className="shadcn-button secondary" style={{ height: '3rem', fontSize: '1rem' }}>
            Get Started
          </Link>
        </div>
      </nav>

      <main>
        {children}
      </main>

      <footer style={{ marginTop: '5rem', textAlign: 'center', padding: '2rem', color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>
        &copy; {new Date().getFullYear()} ShopSmart Inc. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;
