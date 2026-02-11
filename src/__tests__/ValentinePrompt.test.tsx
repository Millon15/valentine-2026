import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ValentinePrompt } from '../components/ValentinePrompt';
import { config } from '../../config/config';

/** Safely create a case-insensitive RegExp from a config string (escaping special chars). */
function configPattern(str: string): RegExp {
  return new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

describe('ValentinePrompt', () => {
  it('renders yes and no buttons', () => {
    render(<ValentinePrompt onYes={() => {}} />);
    expect(screen.getByRole('button', { name: configPattern(config.valentine.yesButton) })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: configPattern(config.valentine.noButton) })).toBeInTheDocument();
  });

  it('calls onYes callback when yes button clicked', async () => {
    const user = userEvent.setup({ delay: null });
    const onYes = vi.fn();
    render(<ValentinePrompt onYes={onYes} />);

    const yesButton = screen.getByRole('button', { name: configPattern(config.valentine.yesButton) });
    await user.click(yesButton);

    await new Promise(resolve => setTimeout(resolve, 600));
    expect(onYes).toHaveBeenCalled();
  });

  it('renders prompt text', () => {
    render(<ValentinePrompt onYes={() => {}} />);
    expect(screen.getByText(configPattern(config.valentine.question))).toBeInTheDocument();
  });

  it('displays hint text for no button', () => {
    render(<ValentinePrompt onYes={() => {}} />);
    expect(screen.getByText(configPattern(config.valentine.hintText))).toBeInTheDocument();
  });

  it('renders decorative elements', () => {
    const { container } = render(<ValentinePrompt onYes={() => {}} />);
    const decorativeElements = container.querySelectorAll('[class*="absolute"]');
    expect(decorativeElements.length).toBeGreaterThan(0);
  });
});
