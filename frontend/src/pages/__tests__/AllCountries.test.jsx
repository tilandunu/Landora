import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AllCountries from '../AllCountries';
import { BrowserRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const mockCountries = [
  {
    cca3: 'USA',
    name: { common: 'United States' },
    capital: ['Washington D.C.'],
    region: 'Americas',
    population: 331000000,
    languages: { eng: 'English' },
    flags: { png: 'https://flagcdn.com/us.png' },
  },
  {
    cca3: 'FRA',
    name: { common: 'France' },
    capital: ['Paris'],
    region: 'Europe',
    population: 67000000,
    languages: { fra: 'French' },
    flags: { png: 'https://flagcdn.com/fr.png' },
  },
];

describe('AllCountries Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountries),
      })
    );
  });

  it('renders loading state initially', () => {
    render(<AllCountries />, { wrapper: BrowserRouter });
    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();
  });

  it('renders country cards after fetch', async () => {
    render(<AllCountries />, { wrapper: BrowserRouter });
    await waitFor(() => {
      expect(screen.getByText(/United States/i)).toBeInTheDocument();
      expect(screen.getByText(/France/i)).toBeInTheDocument();
    });
  });

  it('filters countries based on search input', async () => {
    render(<AllCountries />, { wrapper: BrowserRouter });

    await waitFor(() => screen.getByText(/United States/i));

    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'france' },
    });

    expect(screen.queryByText(/United States/i)).not.toBeInTheDocument();
    expect(screen.getByText(/France/i)).toBeInTheDocument();
  });

  it('filters countries based on region selection', async () => {
    render(<AllCountries />, { wrapper: BrowserRouter });

    await waitFor(() => screen.getByText(/United States/i));

    const regionSelect = screen.getByTestId('region-select');
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });

    expect(screen.queryByText(/United States/i)).not.toBeInTheDocument();
    expect(screen.getByText(/France/i)).toBeInTheDocument();
  });

  it('shows error message if fetch fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(<AllCountries />, { wrapper: BrowserRouter });

    await waitFor(() =>
      expect(
        screen.getByText(/failed to fetch countries data/i)
      ).toBeInTheDocument()
    );
  });
});
