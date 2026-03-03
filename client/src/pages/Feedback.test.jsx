import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Feedback from './Feedback';

// Integration test for the Feedback Page
describe('Feedback Page Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    
    // Mock localStorage for Layout/Auth checks
    Object.defineProperty(window, 'localStorage', {
      value: { setItem: vi.fn(), getItem: vi.fn(), removeItem: vi.fn() },
      writable: true
    });
  });

  it('fetches and displays feedback on mount, and updates list on new submission', async () => {
    const initialData = [
      { id: '1', name: 'Existing User', message: 'Existing message', rating: 4, createdAt: new Date().toISOString() }
    ];
    
    const newData = { id: '2', name: 'New User', message: 'New message', rating: 5, createdAt: new Date().toISOString() };

    // Setup fetch mocks
    global.fetch
      .mockResolvedValueOnce({ // First call: GET
        ok: true,
        json: () => Promise.resolve(initialData),
      })
      .mockResolvedValueOnce({ // Second call: POST
        ok: true,
        json: () => Promise.resolve(newData),
      });

    render(<BrowserRouter><Feedback /></BrowserRouter>);

    // Verify initial load
    expect(await screen.findByText('Existing User')).toBeInTheDocument();
    expect(screen.getByText('Existing message')).toBeInTheDocument();

    // Perform submission
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'New message' } });
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }));

    // Verify list updates with new data
    expect(await screen.findByText('New User')).toBeInTheDocument();
    expect(screen.getByText('New message')).toBeInTheDocument();
    
    // Both should now be in the document
    expect(screen.getByText('Existing User')).toBeInTheDocument();
  });

  it('displays error message if initial fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<BrowserRouter><Feedback /></BrowserRouter>);

    expect(await screen.findByText(/failed to fetch feedback/i)).toBeInTheDocument();
  });
});
