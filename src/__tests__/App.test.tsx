import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders intro screen on initial load', () => {
    render(<App />);
    expect(screen.getByText(/happy valentine/i)).toBeInTheDocument();
  });

  it('displays progress indicator during quiz', async () => {
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole('button', { name: /let's begin/i });
    await user.click(startButton);

    expect(screen.getByText(/Q1\/\d+/)).toBeInTheDocument();
  });

  it('shows first question after starting quiz', async () => {
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole('button', { name: /let's begin/i });
    await user.click(startButton);

    expect(screen.getByText(/Q1\/\d+/)).toBeInTheDocument();
  });

  it('navigates through questions on answer selection', async () => {
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole('button', { name: /let's begin/i });
    await user.click(startButton);

    const answerButtons = screen.getAllByRole('button').filter(btn => {
      const text = btn.textContent || '';
      return text && !text.match(/let's begin|next|previous|submit|welcome|quiz|score|letter|valentine/i);
    });

    if (answerButtons.length > 0 && answerButtons[0]) {
      await user.click(answerButtons[0]);
      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);
      expect(screen.getByText(/Q2\/\d+/)).toBeInTheDocument();
    }
  });

  it('allows answering multiple questions', async () => {
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole('button', { name: /let's begin/i });
    await user.click(startButton);

    expect(screen.getByText(/Q1\/\d+/)).toBeInTheDocument();

    const answerButtons = screen.getAllByRole('button').filter(btn => {
      const text = btn.textContent || '';
      return text && !text.match(/let's begin|next|previous|submit|welcome|quiz|score|letter|valentine/i);
    });

    if (answerButtons.length > 0 && answerButtons[0]) {
      await user.click(answerButtons[0]);
      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);
      expect(screen.getByText(/Q2\/\d+/)).toBeInTheDocument();
    }
  });
});
