import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthPage from '../AuthPage';
import { vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
  global.fetch = vi.fn();
});

describe('AuthPage Component', () => {
  it('renders login tab by default', () => {
    render(<AuthPage />);
    expect(screen.getByText('Log into your account')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toHaveClass('border-b-2');
  });

  it('switches to register tab when clicked', () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText('REGISTER'));
    expect(screen.getByText('Create an account')).toBeInTheDocument();
  });

  it('shows error when login fields are empty', async () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('All fields are required')).toBeInTheDocument();
    });
  });

  it('handles successful login', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mocked-jwt-token' }),
    });

    render(<AuthPage />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(
        screen.getByText('Login successful! Redirecting...')
      ).toBeInTheDocument();
    });
  });

  it('shows error on failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    render(<AuthPage />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('shows error if passwords don’t match during registration', async () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText('REGISTER'));

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'newuser' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'new@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: '654321' },
    });
    fireEvent.click(screen.getByText('Create account'));

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('handles successful registration', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'User created' }),
    });

    render(<AuthPage />);
    fireEvent.click(screen.getByText('REGISTER'));

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'newuser' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'new@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Create account'));

    await waitFor(() => {
      expect(
        screen.getByText('Registration successful! Please log in.')
      ).toBeInTheDocument();
    });
  });
});
