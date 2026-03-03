import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FeedbackForm from './FeedbackForm';

describe('FeedbackForm Component', () => {
  const mockOnFeedbackAdded = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders form fields correctly', () => {
    render(<FeedbackForm onFeedbackAdded={mockOnFeedbackAdded} />);
    
    expect(screen.getByText('Share Your Experience')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
  });

  it('handles successful submission', async () => {
    const mockData = { id: '1', name: 'John', message: 'Great', rating: 5 };
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    render(<FeedbackForm onFeedbackAdded={mockOnFeedbackAdded} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Great' } });
    fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '5' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }));

    await waitFor(() => {
      expect(mockOnFeedbackAdded).toHaveBeenCalledWith(mockData);
    });
    
    // Check if form cleared
    expect(screen.getByLabelText(/name/i).value).toBe('');
    expect(screen.getByLabelText(/message/i).value).toBe('');
  });

  it('displays error message on submission failure', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
    });

    render(<FeedbackForm onFeedbackAdded={mockOnFeedbackAdded} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Error User' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This will fail' } });
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to submit feedback/i)).toBeInTheDocument();
    });
  });

  it('disables button while loading', async () => {
    global.fetch.mockReturnValue(new Promise(() => {})); // Never resolves

    render(<FeedbackForm onFeedbackAdded={mockOnFeedbackAdded} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Loading User' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Wait for it' } });
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }));
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
