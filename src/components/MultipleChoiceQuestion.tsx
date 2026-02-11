import React, { useState } from 'react';
import type { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '../types/Question';
import { triggerSelectionSequence } from '../utils/selectionBurst';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  selectedAnswer: string | null;
  onAnswer: (letterSegment: string) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswer,
}) => {
  const [animatingSegment, setAnimatingSegment] = useState<string | null>(null);

  const handleClick = (letterSegment: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setAnimatingSegment(letterSegment);
    triggerSelectionSequence(e.currentTarget, e.clientX, e.clientY);
    onAnswer(letterSegment);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {question.options.map((option) => {
        const isSelected = selectedAnswer === option.letterSegment;
        const isAnimating = animatingSegment === option.letterSegment;

        return (
          <button
            key={option.letterSegment}
            type="button"
            onClick={(e) => handleClick(option.letterSegment, e)}
            onAnimationEnd={() => {
              if (animatingSegment === option.letterSegment) {
                setAnimatingSegment(null);
              }
            }}
            className={`w-full text-left px-5 sm:px-6 py-4 sm:py-5 rounded-2xl border-2 transition-all duration-300 ${
              isSelected
                ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30 scale-[1.02]'
                : 'border-gray-200 dark:border-white/[0.12] bg-white dark:bg-white/[0.06] hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30 hover:shadow-md'
            } ${isAnimating ? 'animate-[selection-celebrate_0.6s_ease-out]' : ''}`}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-white/10'
                }`}
              >
                {isSelected && (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              <span className={`text-base sm:text-lg font-medium ${
                isSelected ? 'text-emerald-900 dark:text-emerald-200' : 'text-gray-800 dark:text-gray-200'
              }`}>
                {option.text}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
