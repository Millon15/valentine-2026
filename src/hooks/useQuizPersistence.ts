import { useEffect } from 'react';
import type { Dispatch } from 'react';

type Step = 'intro' | 'question' | 'score' | 'letter' | 'valentine';

interface QuizState {
  step: Step;
  questionIndex: number;
  answers: string[];
  emailSent: boolean;
}

type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER_QUESTION'; letterSegment: string }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SHOW_SCORE' }
  | { type: 'SHOW_LETTER' }
  | { type: 'SHOW_VALENTINE' }
  | { type: 'MARK_EMAIL_SENT' }
  | { type: 'RESTORE_STATE'; state: QuizState };

const STORAGE_KEY = 'quiz-state';

/**
 * Custom hook for persisting quiz state to sessionStorage.
 * 
 * Behavior:
 * - On mount: Restores state from sessionStorage if available
 * - On state change: Saves state to sessionStorage
 * - On quiz complete (step === 'valentine'): Clears sessionStorage
 */
export function useQuizPersistence(
  state: QuizState,
  dispatch: Dispatch<QuizAction>
): void {
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const restoredState = JSON.parse(stored) as QuizState;
        dispatch({ type: 'RESTORE_STATE', state: restoredState });
      } catch (error) {
        console.error('Failed to restore quiz state from sessionStorage:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save quiz state to sessionStorage:', error);
    }
  }, [state]);

  useEffect(() => {
    if (state.step === 'valentine') {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear quiz state from sessionStorage:', error);
      }
    }
  }, [state.step]);
}
