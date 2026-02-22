import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadUsers();
  }, []);

  if (error) return <div style={{ color: 'var(--error)' }}>Failed to load members: {error}</div>;
  if (!users.length) return null;

  return (
    <div style={{ marginTop: '4rem', padding: '0 2rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Recent Community Joins</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {users.map(u => (
          <div key={u.id} style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: 'var(--surface-container-low)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', fontWeight: 'bold' }}>
              {u.email[0].toUpperCase()}
            </div>
            <div style={{ fontWeight: 500 }}>{u.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
