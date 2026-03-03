import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import UserForm from './UserForm';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true
});

describe('UserForm Component', () => {
  it('renders login form correctly', () => {
    renderWithRouter(<UserForm mode="login" onSubmitAction={vi.fn()} />);
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.queryByText('Full Name')).not.toBeInTheDocument();
  });

  it('renders signup form correctly', () => {
    renderWithRouter(<UserForm mode="signup" onSubmitAction={vi.fn()} />);
    
    expect(screen.getByText('Join ShopSmart')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('submits login form successfully', async () => {
    const mockSubmit = vi.fn().mockResolvedValue({ token: 'fake-token', user: { id: 1 } });
    renderWithRouter(<UserForm mode="login" onSubmitAction={mockSubmit} />);
    
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    
    await waitFor(() => {
      expect(screen.getByText('Login successful!')).toBeInTheDocument();
    });
  });

  it('displays error message on submission failure', async () => {
    const mockSubmit = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
    renderWithRouter(<UserForm mode="login" onSubmitAction={mockSubmit} />);
    
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
