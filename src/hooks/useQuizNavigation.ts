import { useEffect } from 'react';
import type { Dispatch } from 'react';
import type { QuizState, QuizAction, Step } from '../types/Quiz';

/**
 * Converts quiz state to URL hash string.
 * 
 * @param state - Current quiz state
 * @returns Hash string (e.g., "#intro", "#question/0", "#score")
 */
function stateToHash(state: QuizState): string {
  switch (state.step) {
    case 'intro':
      return '#intro';
    case 'question':
      return `#question/${state.questionIndex}`;
    case 'score':
      return '#score';
    case 'letter':
      return '#letter';
    case 'valentine':
      return '#valentine';
    default:
      return '#intro';
  }
}

/**
 * Parses URL hash to quiz state components.
 * 
 * @param hash - URL hash string (e.g., "#question/0")
 * @returns Parsed state or null if invalid
 */
function hashToState(hash: string): { step: Step; questionIndex: number } | null {
  const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;

  if (!cleanHash || cleanHash === 'intro') {
    return { step: 'intro', questionIndex: 0 };
  }

  if (cleanHash.startsWith('question/')) {
    const indexStr = cleanHash.slice('question/'.length);
    const questionIndex = parseInt(indexStr, 10);
    
    if (isNaN(questionIndex) || questionIndex < 0 || questionIndex > 6) {
      return null;
    }
    
    return { step: 'question', questionIndex };
  }

  if (cleanHash === 'score') {
    return { step: 'score', questionIndex: 0 };
  }

  if (cleanHash === 'letter') {
    return { step: 'letter', questionIndex: 0 };
  }

  if (cleanHash === 'valentine') {
    return { step: 'valentine', questionIndex: 0 };
  }

  return null;
}

/**
 * Validates whether navigation to target state is allowed based on quiz progress.
 * 
 * Rules:
 * - intro: Always allowed
 * - question/0: Always allowed (first question)
 * - question/N: Only if answers[N-1] exists (previous question answered)
 * - score: Only if all 7 questions answered
 * - letter: Only if score screen visited (all questions answered)
 * - valentine: Only if letter screen visited (all questions answered)
 * 
 * @param targetStep - Target step to navigate to
 * @param targetIndex - Target question index (only relevant for 'question' step)
 * @param answers - Current quiz answers array
 * @returns true if navigation is allowed, false otherwise
 */
function validateNavigation(
  targetStep: Step,
  targetIndex: number,
  answers: string[]
): boolean {
  if (targetStep === 'intro') {
    return true;
  }

  if (targetStep === 'question') {
    if (targetIndex === 0) {
      return true;
    }
    
    return answers[targetIndex - 1] !== undefined;
  }

  if (targetStep === 'score' || targetStep === 'letter' || targetStep === 'valentine') {
    return answers.length === 7 && answers.every(answer => answer !== undefined);
  }

  return false;
}

/**
 * Custom hook for integrating browser back/forward buttons with quiz navigation.
 * 
 * Behavior:
 * - Updates URL hash when quiz state changes (using History API)
 * - Listens to browser back/forward events (popstate) and updates quiz state
 * - Validates navigation to prevent skipping unanswered questions
 * - Redirects to first unanswered question if invalid navigation attempted
 * 
 * Hash format:
 * - #intro or empty - Intro screen
 * - #question/0 through #question/6 - Question screens
 * - #score - Score reveal screen
 * - #letter - Love letter screen
 * - #valentine - Valentine prompt screen
 * 
 * @param state - Current quiz state
 * @param dispatch - Dispatch function for quiz actions
 */
export function useQuizNavigation(
  state: QuizState,
  dispatch: Dispatch<QuizAction>
): void {
  useEffect(() => {
    try {
      const hash = stateToHash(state);
      history.pushState(null, '', hash);
    } catch (error) {
      console.error('Failed to update URL hash:', error);
    }
  }, [state]);

  useEffect(() => {
    const handlePopState = () => {
      try {
        const hash = window.location.hash;
        const parsed = hashToState(hash);

        if (!parsed) {
          dispatch({ type: 'NAVIGATE_TO', step: 'intro', questionIndex: 0 });
          return;
        }

        const { step: targetStep, questionIndex: targetIndex } = parsed;

        if (!validateNavigation(targetStep, targetIndex, state.answers)) {
          let redirectIndex = 0;
          for (let i = 0; i < 7; i++) {
            if (state.answers[i] === undefined) {
              redirectIndex = i;
              break;
            }
          }

          if (redirectIndex === 0 && state.answers.length === 0) {
            dispatch({ type: 'NAVIGATE_TO', step: 'intro', questionIndex: 0 });
          } else {
            dispatch({ type: 'NAVIGATE_TO', step: 'question', questionIndex: redirectIndex });
          }
          return;
        }

        dispatch({ type: 'NAVIGATE_TO', step: targetStep, questionIndex: targetIndex });
      } catch (error) {
        console.error('Failed to handle popstate event:', error);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch, state.answers]);
}
