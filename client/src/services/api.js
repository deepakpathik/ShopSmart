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

export const fetchMe = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch profile');
  return data;
};

export const fetchProducts = async (search = '') => {
  const url = search
    ? `${API_URL}/api/products?search=${encodeURIComponent(search)}`
    : `${API_URL}/api/products`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch products');
  return data;
};

export const fetchTopProducts = async () => {
  const res = await fetch(`${API_URL}/api/products/top`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch top products');
  return data;
};
