import React, { useEffect, useState } from 'react';
import './index.css';

const App = () => {
  const [healthStatus, setHealthStatus] = useState('checking');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/health');
        if (response.ok) {
          const data = await response.json();
          setHealthStatus(data.status);
        } else {
          setHealthStatus('error');
        }
      } catch (error) {
        setHealthStatus('offline');
      }
    };
    checkHealth();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5005/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setEmail('');
      alert('Subscribed successfully!');
    } catch(err) {
      alert('Failed to process your subscription.');
    }
  };

  return (
    <div className="container">
      <header className="hero">
        <div className="status-badge">
          System Status: <span className={`status ${healthStatus}`}>{healthStatus}</span>
        </div>
        <h1>Stay Inspired</h1>
        <p>Subscribe for exclusive offers and our latest ShopSmart arrivals.</p>
        
        <form onSubmit={handleSubscribe} className="input-group">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="shadcn-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="shadcn-button">Subscribe</button>
        </form>
      </header>
    </div>
  );
};

export default App;
