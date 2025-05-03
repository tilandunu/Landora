import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingScreen from '../LoadingScreen';

describe('LoadingScreen', () => {
  it('renders loading icon and text', () => {
    render(<LoadingScreen />);

    // Sun icon using Material Symbols
    expect(screen.getByText('brightness_7')).toBeInTheDocument();

    // Loading text
    expect(screen.getByText(/navigating the world/i)).toBeInTheDocument();
  });

  it('renders 4 animated ping dots', () => {
    const { container } = render(<LoadingScreen />);
    const dots = container.querySelectorAll('.animate-ping');
    expect(dots.length).toBe(4);
  });

  it('is positioned as fullscreen and centered', () => {
    const { container } = render(<LoadingScreen />);
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass(
      'fixed',
      'inset-0',
      'flex',
      'items-center',
      'justify-center'
    );
  });
});
