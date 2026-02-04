import React, { useEffect, useState } from 'react';
import './index.css';

const App = () => {
  const [healthStatus, setHealthStatus] = useState('checking');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

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
    setMessage({ type: 'checking', text: 'Subscribing...' });
    try {
      const res = await fetch('http://localhost:5005/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!res.ok) {
        throw new Error('Failed to subscribe');
      }
      
      setEmail('');
      setMessage({ type: 'ok', text: 'Subscribed successfully!' });
    } catch(err) {
      setMessage({ type: 'error', text: 'Failed to process your subscription.' });
    }
    
    setTimeout(() => setMessage(null), 3000);
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
        {message && (
          <div style={{ marginTop: '1rem', fontSize: '0.875rem' }} className={`status ${message.type}`}>
            {message.text}
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
