import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ mode, onSubmitAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const isLogin = mode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: 'checking', text: 'Processing...' });

    try {
      const payload = isLogin
        ? { email, password }
        : { email, password, name, role };

      const data = await onSubmitAction(payload);
      setMessage({ type: 'ok', text: isLogin ? 'Login successful!' : 'Account created!' });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="container" style={{ maxWidth: '420px', margin: '4rem auto' }}>
      <header className="hero" style={{ padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
          {isLogin ? 'Welcome Back' : 'Join ShopSmart'}
        </h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-muted-foreground)' }}>
          {isLogin ? 'Sign in to your account.' : 'Create your account and start shopping.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="shadcn-input"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
          )}
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
          {!isLogin && (
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="shadcn-input"
              style={{ cursor: 'pointer' }}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="SELLER">Seller</option>
            </select>
          )}
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
