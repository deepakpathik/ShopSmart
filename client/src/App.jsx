import React, { useEffect, useState } from 'react';

const App = () => {
  const [healthStatus, setHealthStatus] = useState('checking...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
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

  return (
    <div className="container">
      <header className="hero">
        <h1>ShopSmart</h1>
        <p>Your minimalist shopping experience.</p>
        <div className="status-badge">
          System Status: <span className={`status ${healthStatus}`}>{healthStatus}</span>
        </div>
      </header>
    </div>
  );
};

export default App;
