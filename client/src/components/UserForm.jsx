import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ mode, onSubmitAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const isLogin = mode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: 'checking', text: 'Processing...' });

    try {
      const data = await onSubmitAction({ email, password });
      setMessage({ type: 'ok', text: isLogin ? 'Login successful!' : 'Account created!' });
      localStorage.setItem('token', data.token);
      setTimeout(() => navigate('/'), 1200);
    } catch(err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <header className="hero" style={{ padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          {isLogin ? 'Welcome Back' : 'Join Us'}
        </h1>
        <p style={{ marginBottom: '2rem' }}>
          {isLogin ? 'Access your vibrant gallery.' : 'Register and start exploring.'}
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
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
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            minLength={6}
          />
          <button type="submit" className="shadcn-button" style={{ width: '100%' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
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

export default UserForm;
