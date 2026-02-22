import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import UserList from '../components/UserList';

const SparkleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.13 2.51357C10.74 3.01357 8.52 4.16357 6.64 5.92357C4.68 7.74357 3.32 10.0836 2.58 12.6836L12.98 23.0836C15.58 22.3436 17.92 20.9836 19.74 19.0236C21.43 17.2136 22.56 15.0636 23.11 12.7536L13.13 2.51357ZM20.73 1.25357L14.81 1.63357C16.89 3.02357 18.66 4.79357 20.05 6.87357L20.43 0.953568L20.73 1.25357Z" fill="currentColor"/>
    <path d="M2.26953 15.5137L6.50953 19.7537L4.38953 21.8737L0.149536 17.6337L2.26953 15.5137Z" fill="currentColor"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
  </svg>
);


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
        <p className="loader-text">Loading the Fun</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container" style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto', marginBottom: '5rem' }}>
        <header className="hero">
          <div style={{ position: 'relative', display: 'inline-block', zIndex: 1 }}>
            <span style={{ position: 'absolute', top: '-1rem', right: '-2rem', transform: 'rotate(15deg)', fontSize: '2rem' }}>✨</span>
            <h1 style={{ marginBottom: '1.5rem', fontSize: '4.5rem', lineHeight: '1.1', color: 'var(--primary-container)', WebkitTextStroke: '2px var(--primary)', textShadow: '4px 4px 0px var(--tertiary-container)' }}>
              Colorful Vibes Only.
            </h1>
          </div>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--on-surface-variant)', fontWeight: 500 }}>
            Jump into our vibrant playground of premium goods. Fun to browse, thrilling to unbox.
          </p>
          <div className="input-group" style={{ marginTop: '3.5rem', justifyContent: 'center' }}>
            <Link to="/signup" className="shadcn-button">Shop the Rainbow</Link>
          </div>
        </header>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          
          <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(to bottom right, var(--surface-container-lowest), var(--surface-container-low))' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '40%', background: 'linear-gradient(135deg, var(--primary), var(--primary-container))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'var(--shadow-primary)' }}>
              <SparkleIcon />
            </div>
            <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>Premium Picks</h4>
            <p style={{ margin: '0.75rem 0 0 0', fontSize: '1rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, fontWeight: 500 }}>
              Curated items that bring an absolute burst of joy to your everyday life.
            </p>
          </div>

          <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(to bottom right, var(--surface-container-lowest), var(--surface-container-low))' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '40%', background: 'linear-gradient(135deg, var(--secondary), var(--secondary-container))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'var(--shadow-secondary)' }}>
              <RocketIcon />
            </div>
            <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>Hyper Delivery</h4>
            <p style={{ margin: '0.75rem 0 0 0', fontSize: '1rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, fontWeight: 500 }}>
              Rocket-fast shipping straight to your door with colorful eco-friendly packing.
            </p>
          </div>

          <div className="glass-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(to bottom right, var(--surface-container-lowest), var(--surface-container-low))' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '40%', background: 'linear-gradient(135deg, var(--tertiary), var(--tertiary-container))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'var(--shadow-tertiary)' }}>
              <HeartIcon />
            </div>
            <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--tertiary)' }}>24/7 Love</h4>
            <p style={{ margin: '0.75rem 0 0 0', fontSize: '1rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, fontWeight: 500 }}>
              Our friendly support team is always here to spread good vibes and solve issues.
            </p>
          </div>

        </div>

        <UserList />
      </div>
    </Layout>
  );
};

export default Home;
