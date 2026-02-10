import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuestionCard } from '../components/QuestionCard';

describe('QuestionCard', () => {
  it('renders question text', () => {
    render(
      <QuestionCard questionText="What is your favorite color?">
        <div>Test content</div>
      </QuestionCard>
    );
    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <QuestionCard questionText="Test question">
        <button type="button">Test button</button>
      </QuestionCard>
    );
    expect(screen.getByRole('button', { name: /test button/i })).toBeInTheDocument();
  });

  it('applies liquid glass design styling', () => {
    const { container } = render(
      <QuestionCard questionText="Test">
        <div>Content</div>
      </QuestionCard>
    );
    const cardElement = container.querySelector('[class*="backdrop-blur"]');
    expect(cardElement).toBeInTheDocument();
  });

  it('renders animated background decorations', () => {
    const { container } = render(
      <QuestionCard questionText="Test">
        <div>Content</div>
      </QuestionCard>
    );
    const decorations = container.querySelectorAll('.absolute.inset-0 > div');
    expect(decorations.length).toBeGreaterThan(0);
  });

  it('renders video element when videoSrc is provided', () => {
    const { container } = render(
      <QuestionCard questionText="Test" videoSrc="videos/cat1.webm">
        <div>Content</div>
      </QuestionCard>
    );
    const videoElement = container.querySelector('video') as HTMLVideoElement;
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('loop');
    expect(videoElement).toHaveAttribute('controls');
    expect(videoElement).toHaveAttribute('playsinline');
    expect(videoElement.autoplay).toBe(true);
    expect(videoElement.muted).toBe(true);
  });

  it('does not render video element when videoSrc is undefined', () => {
    const { container } = render(
      <QuestionCard questionText="Test">
        <div>Content</div>
      </QuestionCard>
    );
    const videoElement = container.querySelector('video');
    expect(videoElement).not.toBeInTheDocument();
  });
});
