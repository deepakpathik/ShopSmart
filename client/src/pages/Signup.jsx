import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage({ type: 'checking', text: 'Creating profile...' });

    try {
      const res = await fetch('http://localhost:5005/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      
      setMessage({ type: 'ok', text: 'Onboarding complete! Redirecting...' });
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
        <h1>Join the Gallery</h1>
        <p>Register to unlock our exclusive architectural collections.</p>
        
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2.5rem' }}>
          <input 
            type="email" 
            placeholder="Work email preferred" 
            className="shadcn-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input 
            type="password" 
            placeholder="Secure password" 
            className="shadcn-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength="6"
          />
          <button type="submit" className="shadcn-button" style={{ marginTop: '0.5rem', width: '100%' }}>Register Account</button>
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

export default Signup;
