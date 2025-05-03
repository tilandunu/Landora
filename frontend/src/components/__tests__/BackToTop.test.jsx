import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BackToTop from '../BackToTop';

describe('BackToTop component', () => {
  it('renders both buttons and calls scrollToTop on click', () => {
    const scrollToTopMock = vi.fn();

    render(<BackToTop scrollToTop={scrollToTopMock} />);

    // Expect both buttons to be in the document
    const iconButton = screen.getByLabelText('Back to top');
    const textButton = screen.getByText(/back to top/i);

    expect(iconButton).toBeInTheDocument();
    expect(textButton).toBeInTheDocument();

    // Simulate clicks
    fireEvent.click(iconButton);
    fireEvent.click(textButton);

    // Expect the scrollToTop function to be called twice
    expect(scrollToTopMock).toHaveBeenCalledTimes(2);
  });
});
