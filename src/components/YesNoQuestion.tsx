import React, { useState } from 'react';
import type { YesNoQuestion as YesNoQuestionType } from '../types/Question';
import { triggerSelectionSequence } from '../utils/selectionBurst';

interface YesNoQuestionProps {
  question: YesNoQuestionType;
  selectedAnswer: string | null;
  onAnswer: (letterSegment: string) => void;
}

export const YesNoQuestion: React.FC<YesNoQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswer,
}) => {
  const [animatingSegment, setAnimatingSegment] = useState<string | null>(null);

  const yesOption = question.options.find(opt => opt.value === 'yes');
  const noOption = question.options.find(opt => opt.value === 'no');

  if (!yesOption || !noOption) {
    return null;
  }

  const isYesSelected = selectedAnswer === yesOption.letterSegment;
  const isNoSelected = selectedAnswer === noOption.letterSegment;

  const handleClick = (letterSegment: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setAnimatingSegment(letterSegment);
    triggerSelectionSequence(e.currentTarget, e.clientX, e.clientY);
    onAnswer(letterSegment);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={(e) => handleClick(noOption.letterSegment, e)}
          onAnimationEnd={() => {
            if (animatingSegment === noOption.letterSegment) {
              setAnimatingSegment(null);
            }
          }}
          className={`flex-1 max-w-xs px-6 sm:px-8 py-5 sm:py-6 rounded-2xl border-2 transition-all duration-300 ${
            isNoSelected
              ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30'
              : 'border-gray-200 dark:border-white/[0.12] bg-white dark:bg-white/[0.06] hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30'
          } ${animatingSegment === noOption.letterSegment ? 'animate-[selection-celebrate_0.6s_ease-out]' : ''}`}
        >
          <div className="text-center space-y-2">
            <div className={`text-3xl sm:text-4xl ${isNoSelected ? 'scale-110' : ''} transition-transform duration-300`}>
              💫
            </div>
            <span className={`block text-lg sm:text-xl font-semibold ${
              isNoSelected ? 'text-emerald-900 dark:text-emerald-200' : 'text-gray-700 dark:text-gray-200'
            }`}>
              {noOption.text}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={(e) => handleClick(yesOption.letterSegment, e)}
          onAnimationEnd={() => {
            if (animatingSegment === yesOption.letterSegment) {
              setAnimatingSegment(null);
            }
          }}
          className={`flex-1 max-w-xs px-6 sm:px-8 py-5 sm:py-6 rounded-2xl border-2 transition-all duration-300 ${
            isYesSelected
              ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30'
              : 'border-gray-200 dark:border-white/[0.12] bg-white dark:bg-white/[0.06] hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30'
          } ${animatingSegment === yesOption.letterSegment ? 'animate-[selection-celebrate_0.6s_ease-out]' : ''}`}
        >
          <div className="text-center space-y-2">
            <div className={`text-3xl sm:text-4xl ${isYesSelected ? 'scale-110' : ''} transition-transform duration-300`}>
              💖
            </div>
            <span className={`block text-lg sm:text-xl font-semibold ${
              isYesSelected ? 'text-emerald-900 dark:text-emerald-200' : 'text-gray-700 dark:text-gray-200'
            }`}>
              {yesOption.text}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
