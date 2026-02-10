import React from 'react';
import { ThemeToggle } from './ThemeToggle';

type Step = 'intro' | 'question' | 'score' | 'letter' | 'valentine';

interface JourneyIndicatorProps {
  currentStep: Step;
  onNavigate?: (step: Step) => void;
  progress?: { current: number; total: number };
}

const STEPS: { key: Step; label: string }[] = [
  { key: 'intro', label: 'Welcome' },
  { key: 'question', label: 'Quiz' },
  { key: 'score', label: 'Score' },
  { key: 'letter', label: 'Letter' },
  { key: 'valentine', label: 'Valentine' },
];

export const JourneyIndicator: React.FC<JourneyIndicatorProps> = ({ currentStep, onNavigate, progress }) => {
  const currentIndex = STEPS.findIndex(s => s.key === currentStep);
  const canNavigate = !!onNavigate;

  return (
    <div className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-b border-rose-200/30 dark:border-white/10 shadow-sm transition-colors duration-500">
      <div className="flex items-center justify-center gap-2 py-3 relative">
        {STEPS.map((step, index) => {
          const isCompleted = canNavigate || index < currentIndex;
          const isCurrent = index === currentIndex;
          const canClick = canNavigate && !isCurrent;

          return (
            <React.Fragment key={step.key}>
              {index > 0 && (
                <div
                  className={`h-px w-6 sm:w-8 transition-colors duration-500 ${
                    isCompleted || isCurrent ? 'bg-rose-400' : 'bg-rose-200/50 dark:bg-gray-700'
                  }`}
                />
              )}
              <button
                type="button"
                disabled={!canClick}
                onClick={() => canClick && onNavigate!(step.key)}
                className={`group flex flex-col items-center gap-1 transition-transform duration-300 ${
                  canClick ? 'cursor-pointer hover:scale-110' : 'cursor-default'
                }`}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-3 h-3 bg-rose-500 shadow-lg shadow-rose-400/50'
                      : isCompleted
                      ? 'w-2.5 h-2.5 bg-rose-400'
                      : 'w-2 h-2 bg-rose-200/60 dark:bg-gray-600'
                  } ${canClick ? 'group-hover:scale-125 group-hover:shadow-md group-hover:shadow-rose-400/40' : ''}`}
                />
                <span
                  className={`text-[10px] transition-all duration-300 hidden sm:block ${
                    isCurrent
                      ? 'text-rose-600 dark:text-rose-400 font-medium'
                      : isCompleted
                      ? 'text-rose-400 dark:text-rose-500'
                      : 'text-rose-300/60 dark:text-gray-500'
                  } ${canClick ? 'group-hover:text-rose-600 dark:group-hover:text-rose-400 group-hover:font-medium' : ''}`}
                >
                  {step.label}
                </span>
              </button>
            </React.Fragment>
          );
        })}

        <div className="absolute right-3">
          <ThemeToggle />
        </div>
      </div>

      {progress && (
        <div className="px-4 pb-2">
          <div className="max-w-md mx-auto flex items-center gap-3">
            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Q{progress.current}/{progress.total}
            </span>
            <div className="flex-1 h-1.5 bg-gray-200/80 dark:bg-gray-700/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              {Math.round((progress.current / progress.total) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
