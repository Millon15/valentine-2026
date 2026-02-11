import React from 'react';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  nextLabel?: string;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  showBack = true,
  showNext = true,
  nextDisabled = false,
  nextLabel = 'Next',
}) => {
  return (
    <div className="flex items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white dark:bg-white/10 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-white/15 transition-all duration-300 hover:shadow-md active:scale-95"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>
      ) : (
        <div />
      )}

      {showNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 font-semibold rounded-xl transition-all duration-300 ${
            nextDisabled
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 hover:scale-105 active:scale-95'
          }`}
        >
          <span>{nextLabel}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              nextDisabled ? '' : 'group-hover:translate-x-1'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
