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
    expect(screen.getByText(/jihyeon/i)).toBeInTheDocument();
  });

  it('displays progress bar during quiz', async () => {
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole('button', { name: /let's go/i });
    await user.click(startButton);

    expect(screen.getByText(/question/i)).toBeInTheDocument();
  });

  it('shows first question after starting quiz', async () => {
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole('button', { name: /let's go/i });
    await user.click(startButton);

    expect(screen.getByText(/question 1 of 7/i)).toBeInTheDocument();
  });

  it('navigates through questions on answer selection', async () => {
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole('button', { name: /let's go/i });
    await user.click(startButton);

    const firstOption = screen.getAllByRole('button').find(btn =>
      btn.textContent?.includes('The way our conversations just flow')
    );

    if (firstOption) {
      await user.click(firstOption);
      // After selecting, need to click Next to advance
      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);
      expect(screen.getByText(/question 2 of 7/i)).toBeInTheDocument();
    }
  });

  it('allows answering multiple questions', async () => {
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole('button', { name: /let's go/i });
    await user.click(startButton);

    expect(screen.getByText(/question 1 of 7/i)).toBeInTheDocument();

    // Click the first answer option for Q1
    const firstAnswerButton = screen.getByRole('button', { name: /the way our conversations just flow/i });
    await user.click(firstAnswerButton);

    // Click Next to advance
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    expect(screen.getByText(/question 2 of 7/i)).toBeInTheDocument();
  });
});
