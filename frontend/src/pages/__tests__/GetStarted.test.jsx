import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import GetStarted from '../GetStarted';

const mockNavigate = vi.fn();

// Mock `useNavigate` from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('GetStarted Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it('renders title and subtitle', () => {
    render(
      <MemoryRouter>
        <GetStarted />
      </MemoryRouter>
    );

    expect(screen.getByText(/LANDORA/i)).toBeInTheDocument();
    expect(
      screen.getByText(/All the countries. None of the baggage fees/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/GET STARTED/i)).toBeInTheDocument();
  });

  it('navigates to /auth when no token is present', () => {
    render(
      <MemoryRouter>
        <GetStarted />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/GET STARTED/i));
    expect(mockNavigate).toHaveBeenCalledWith('/auth');
  });

  it('navigates to /home when token is present', () => {
    localStorage.setItem('authToken', 'mock-token');

    render(
      <MemoryRouter>
        <GetStarted />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/GET STARTED/i));
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});
