import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';

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
    <div className="flex justify-center items-center py-20 px-4">
      <Card className="w-full max-w-md shadow-lg border border-border">
        <CardHeader className="space-y-1 text-center pb-8 border-b border-border/40 mb-6 bg-surface-container-lowest rounded-t-xl">
          <CardTitle className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {isLogin ? 'Welcome Back' : 'Join ShopSmart'}
          </CardTitle>
          <CardDescription className="text-base mt-2 font-medium">
            {isLogin ? 'Sign in to your account.' : 'Create your account and start shopping.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                minLength={6}
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I want to
                </label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="CUSTOMER">Buy products (Customer)</option>
                  <option value="SELLER">Sell products (Seller)</option>
                </select>
              </div>
            )}
            <Button type="submit" size="lg" className="w-full mt-6 text-base font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-lg text-sm font-medium text-center shadow-sm ${
              message.type === 'ok' ? 'bg-green-50 text-green-800 border border-green-200' :
              message.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {message.text}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
