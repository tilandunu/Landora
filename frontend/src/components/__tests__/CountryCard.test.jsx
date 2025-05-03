import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CountryCard from '../CountryCard';
import React from 'react';

describe('CountryCard', () => {
  const mockCountry = {
    name: 'Japan',
    description: 'A country in East Asia known for its technology and culture.',
    population: '125M',
    language: 'Japanese',
    flag: 'https://example.com/japan-flag.svg',
    bg: 'https://example.com/japan-bg.jpg',
  };

  it('renders country details correctly', () => {
    render(
      <CountryCard country={mockCountry} contentRef={React.createRef()} />
    );

    // Check for name, description, population, language
    expect(screen.getByTestId('country-name')).toHaveTextContent('Japan');
    expect(
      screen.getByText(/A country in East Asia known for its technology/i)
    ).toBeInTheDocument();
    expect(screen.getByText('125M')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();

    // Check for flag image with alt text
    const flag = screen.getByAltText(/Japan/i);
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveAttribute('src', mockCountry.flag);
  });
});
