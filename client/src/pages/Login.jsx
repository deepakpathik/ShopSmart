import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ type: 'checking', text: 'Authenticating...' });

    try {
      const res = await fetch('http://localhost:5005/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      setMessage({ type: 'ok', text: 'Login successful! Redirecting...' });
      localStorage.setItem('token', data.token);
      
      setTimeout(() => navigate('/'), 1200);
    } catch(err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="container">
      <header className="hero">
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', display: 'inline-block' }}>
          ← Back
        </Link>
        <h1>Welcome Back</h1>
        <p>Access your architectural gallery.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2.5rem' }}>
          <input 
            type="email" 
            placeholder="Email address" 
            className="shadcn-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="shadcn-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit" className="shadcn-button" style={{ marginTop: '0.5rem', width: '100%' }}>Login Access</button>
        </form>
        
        {message && (
          <div style={{ marginTop: '1.5rem', fontSize: '0.875rem' }} className={`status ${message.type}`}>
            {message.text}
          </div>
        )}
      </header>
    </div>
  );
};

export default Login;
