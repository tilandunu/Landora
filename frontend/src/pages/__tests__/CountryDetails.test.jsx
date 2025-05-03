import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CountryDetails from '../CountryDetails';
import { vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
  global.fetch = vi.fn();
});

describe('CountryDetails Component', () => {
  it('renders loading state initially', () => {
    render(
      <Router>
        <CountryDetails />
      </Router>
    );
    expect(screen.getByText(/Loading country details.../i)).toBeInTheDocument();
  });

  it('renders error message if fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to fetch' }),
    });

    render(
      <Router>
        <CountryDetails />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Error: Failed to fetch country details/)
      ).toBeInTheDocument();
    });
  });

  it('renders country details when fetch is successful', async () => {
    const countryData = {
      name: { official: 'Country X', common: 'X' },
      capital: ['Capital X'],
      population: 123456789,
      area: 123456,
      region: 'Asia',
      subregion: 'Southeast Asia',
      languages: { eng: 'English' },
      currencies: { USD: { name: 'United States Dollar', symbol: '$' } },
      continents: ['Asia'],
      timezones: ['UTC+8'],
      flags: { svg: 'flag-url' },
      maps: {
        googleMaps: 'google-maps-url',
        openStreetMaps: 'open-street-map-url',
      },
      borders: ['COUNTRY-Y'],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [countryData],
    });

    render(
      <Router>
        <CountryDetails />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Country X/i)).toBeInTheDocument();
      expect(screen.getByText(/Capital X/i)).toBeInTheDocument();
      expect(screen.getByText('123,456,789')).toBeInTheDocument();
      expect(screen.getByText('123,456 km²')).toBeInTheDocument();
      expect(screen.getByText('Asia')).toBeInTheDocument();
    });
  });

  it('displays "Country not found" when no country data is returned', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(
      <Router>
        <CountryDetails />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Country not found/i)).toBeInTheDocument();
    });
  });
});
