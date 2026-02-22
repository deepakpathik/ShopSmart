const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
};

export const registerUser = async (credentials) => {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  return data;
};

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/api/users`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
  return data;
};
