import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p className="loader-text">Initializing ShopSmart</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '2rem 3rem' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>ShopSmart</h2>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'var(--on-surface)', fontSize: '0.875rem', fontWeight: 500 }}>Login</Link>
          <Link to="/signup" className="shadcn-button" style={{ height: '2.25rem', padding: '0 1rem', textDecoration: 'none' }}>Sign Up</Link>
        </div>
      </nav>

      <div className="container" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', marginBottom: '4rem' }}>
        <header className="hero" style={{ marginBottom: 0 }}>
          <h1 style={{ marginBottom: '1.5rem', fontSize: '4rem' }}>Curated Excellence.</h1>
          <p style={{ maxWidth: '600px', fontSize: '1.125rem', opacity: 0.8 }}>Discover our latest gallery of premium objects, selected for uncompromising architectural quality and timeless endurance.</p>
          <div className="input-group" style={{ marginTop: '2.5rem' }}>
            <Link to="/signup" className="shadcn-button" style={{ textDecoration: 'none' }}>Explore Collection</Link>
          </div>
        </header>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '2rem' }}>Platform Features</h3>
        <div className="users-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="avatar" style={{ marginBottom: '1rem', background: 'var(--surface-container-low)', color: 'var(--primary)' }}>✧</div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Premium Gallery</h4>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', opacity: 0.7, lineHeight: 1.5 }}>
              Hand-selected inventory designed to fit perfectly within monolithic and minimalist spaces.
            </p>
          </div>
          <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="avatar" style={{ marginBottom: '1rem', background: 'var(--surface-container-low)', color: 'var(--primary)' }}>◈</div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Global Shipping</h4>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', opacity: 0.7, lineHeight: 1.5 }}>
              Seamlessly delivered directly to your studio with carbon-neutral logistics and premium packaging.
            </p>
          </div>
          <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="avatar" style={{ marginBottom: '1rem', background: 'var(--surface-container-low)', color: 'var(--primary)' }}>⌾</div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>24/7 Concierge</h4>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', opacity: 0.7, lineHeight: 1.5 }}>
              Dedicated style curators are available round the clock to consult on layout and aesthetic harmony.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
