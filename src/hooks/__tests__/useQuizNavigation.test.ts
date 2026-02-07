import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuizNavigation } from '../useQuizNavigation';

type Step = 'intro' | 'question' | 'score' | 'letter' | 'valentine';

interface QuizState {
  step: Step;
  questionIndex: number;
  answers: string[];
  emailSent: boolean;
}

describe('useQuizNavigation', () => {
  beforeEach(() => {
    // Reset location hash
    window.location.hash = '';

    // Clear all mocks
    vi.clearAllMocks();

    // Mock history.pushState
    vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('updates hash when state changes', () => {
    const mockDispatch = vi.fn();
    const pushStateSpy = vi.spyOn(window.history, 'pushState');

    const initialState: QuizState = {
      step: 'intro',
      questionIndex: 0,
      answers: [],
      emailSent: false,
    };

    const { rerender } = renderHook(
      ({ state }) => useQuizNavigation(state, mockDispatch),
      { initialProps: { state: initialState } }
    );

    // Change state to question 0
    const questionState: QuizState = {
      step: 'question',
      questionIndex: 0,
      answers: [],
      emailSent: false,
    };

    rerender({ state: questionState });

    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '#question/0');

    pushStateSpy.mockRestore();
  });

  it('dispatches NAVIGATE_TO on popstate event', () => {
    const mockDispatch = vi.fn();

    // Set initial hash
    window.location.hash = '#question/2';

    const state: QuizState = {
      step: 'question',
      questionIndex: 0,
      answers: ['a', 'b', 'c'],
      emailSent: false,
    };

    renderHook(() => useQuizNavigation(state, mockDispatch));

    // Simulate browser back button
    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'NAVIGATE_TO',
      step: 'question',
      questionIndex: 2,
    });
  });

  it('validates URL against answers and redirects if invalid', () => {
    const mockDispatch = vi.fn();
    const pushStateSpy = vi.spyOn(window.history, 'pushState');

    // Try to navigate to question 5 without answering previous questions
    window.location.hash = '#question/5';

    const state: QuizState = {
      step: 'intro',
      questionIndex: 0,
      answers: ['a', 'b'], // Only 2 answers
      emailSent: false,
    };

    renderHook(() => useQuizNavigation(state, mockDispatch));

    // Simulate browser back button
    window.dispatchEvent(new PopStateEvent('popstate'));

    // Should redirect to first unanswered question (index 2)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'NAVIGATE_TO',
      step: 'question',
      questionIndex: 2,
    });

    pushStateSpy.mockRestore();
  });

  it('handles invalid hash format gracefully', () => {
    const mockDispatch = vi.fn();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    window.location.hash = '#invalid-format-xyz';

    const state: QuizState = {
      step: 'intro',
      questionIndex: 0,
      answers: [],
      emailSent: false,
    };

    expect(() => {
      renderHook(() => useQuizNavigation(state, mockDispatch));
    }).not.toThrow();

    // Simulate browser back button
    window.dispatchEvent(new PopStateEvent('popstate'));

    // Should default to intro when hash is invalid
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'NAVIGATE_TO',
      step: 'intro',
      questionIndex: 0,
    });

    consoleErrorSpy.mockRestore();
  });
});
