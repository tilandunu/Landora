import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InfoBoxes from '../InfoBoxes';

describe('InfoBoxes', () => {
  it('renders all 3 info boxes', () => {
    render(<InfoBoxes />);
    const boxes = screen.getAllByText(
      /languages spoken|cities in the world|continents represented/i
    );
    expect(boxes).toHaveLength(3);
  });

  it('displays correct values in each box', () => {
    render(<InfoBoxes />);
    expect(screen.getByText('7000+')).toBeInTheDocument();
    expect(screen.getByText('20000+')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('displays correct labels in each box', () => {
    render(<InfoBoxes />);
    expect(screen.getByText(/languages spoken/i)).toBeInTheDocument();
    expect(screen.getByText(/cities in the world/i)).toBeInTheDocument();
    expect(screen.getByText(/continents represented/i)).toBeInTheDocument();
  });

  it('renders SVG icons for each box', () => {
    render(<InfoBoxes />);
    const svgs = screen.getAllByRole('img', { hidden: true });
    expect(svgs.length).toBeGreaterThanOrEqual(3); // Depending on environment may be more
  });
});
