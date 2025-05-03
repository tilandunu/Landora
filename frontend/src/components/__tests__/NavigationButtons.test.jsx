import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationButtons from '../NavigationButtons';

describe('NavigationButtons', () => {
  it('renders mobile navigation buttons', () => {
    const mockHandleChange = vi.fn();
    render(
      <NavigationButtons handleChange={mockHandleChange} isMobile={true} />
    );

    const prevButton = screen.getByLabelText('Previous country');
    const nextButton = screen.getByLabelText('Next country');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('renders desktop navigation buttons', () => {
    const mockHandleChange = vi.fn();
    render(
      <NavigationButtons handleChange={mockHandleChange} isMobile={false} />
    );

    const prevButton = screen.getByLabelText('Previous country');
    const nextButton = screen.getByLabelText('Next country');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('calls handleChange with correct arguments', () => {
    const mockHandleChange = vi.fn();
    render(
      <NavigationButtons handleChange={mockHandleChange} isMobile={true} />
    );

    const prevButton = screen.getByLabelText('Previous country');
    const nextButton = screen.getByLabelText('Next country');

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    expect(mockHandleChange).toHaveBeenCalledWith('prev');
    expect(mockHandleChange).toHaveBeenCalledWith('next');
    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });
});
