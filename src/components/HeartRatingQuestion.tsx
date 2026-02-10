import React, { useState } from 'react';
import type { HeartRatingQuestion as HeartRatingQuestionType } from '../types/Question';
import { triggerFloatingHearts } from '../utils/selectionBurst';

const HEART_LABELS: Record<number, string> = {
  1: 'A gentle warmth',
  2: 'Growing stronger',
  3: 'Truly special',
  4: "Can't stop thinking of you",
  5: 'Absolutely overflowing!',
};

interface HeartRatingQuestionProps {
  question: HeartRatingQuestionType;
  selectedAnswer: string | null;
  onAnswer: (letterSegment: string) => void;
}

export const HeartRatingQuestion: React.FC<HeartRatingQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswer,
}) => {
  const [hoveredHearts, setHoveredHearts] = useState<number | null>(null);
  const [animatingSegment, setAnimatingSegment] = useState<string | null>(null);

  const getOptionForHearts = (hearts: number) => {
    return question.options.find(opt => opt.hearts === hearts);
  };

  const selectedHearts = selectedAnswer
    ? question.options.find(opt => opt.letterSegment === selectedAnswer)?.hearts ?? null
    : null;

  const activeHearts = hoveredHearts ?? selectedHearts;

  const handleClick = (letterSegment: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setAnimatingSegment(letterSegment);
    triggerFloatingHearts(e.currentTarget);
    onAnswer(letterSegment);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
        {Array.from({ length: question.maxHearts }, (_, i) => i + 1).map((hearts) => {
          const option = getOptionForHearts(hearts);
          const isFilled = activeHearts !== null && hearts <= activeHearts;
          const isAnimating = option !== undefined && animatingSegment === option.letterSegment;

          return (
            <button
              key={hearts}
              type="button"
              onClick={(e) => option && handleClick(option.letterSegment, e)}
              onMouseEnter={() => setHoveredHearts(hearts)}
              onMouseLeave={() => setHoveredHearts(null)}
              onAnimationEnd={() => {
                if (option && animatingSegment === option.letterSegment) {
                  setAnimatingSegment(null);
                }
              }}
              className={`cursor-pointer ${isAnimating ? 'animate-[heart-dance_0.6s_ease-out]' : ''}`}
              aria-label={`Rate ${hearts} out of ${question.maxHearts} hearts`}
            >
              <svg
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-all duration-300 ${
                  isFilled
                    ? 'fill-rose-500 stroke-rose-600 drop-shadow-lg'
                    : 'fill-gray-200 stroke-gray-300'
                }`}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          );
        })}
      </div>

      <div className="min-h-[28px] text-center">
        <p
          className={`text-sm sm:text-base text-rose-600 font-medium transition-opacity duration-300 ${
            activeHearts !== null && HEART_LABELS[activeHearts] ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {activeHearts !== null && HEART_LABELS[activeHearts]
            ? HEART_LABELS[activeHearts]
            : '\u00A0'}
        </p>
      </div>
    </div>
  );
};
