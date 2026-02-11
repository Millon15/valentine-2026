import React from 'react';
import { useVideoAutoplay } from '../hooks/useVideoAutoplay';
import { questionVariants } from '../styles/questionVariants';

interface QuestionCardProps {
  questionText: string;
  videoSrc?: string;
  designVariant?: string;
  children: React.ReactNode;
}

/**
 * Strip backdrop-blur-* classes from a class string.
 * iOS Safari has a compositing bug where <video> elements inside
 * a backdrop-filter container are completely non-functional
 * (no autoplay, no manual play, no loading).
 */
function stripBackdropBlur(classes: string): string {
  return classes.replace(/backdrop-blur-\w+/g, '').trim();
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionText,
  videoSrc,
  designVariant,
  children,
}) => {
  const { registerVideo } = useVideoAutoplay();
  const variant = designVariant ? questionVariants[designVariant] : null;

  // When the card contains a video, remove backdrop-blur to fix iOS playback.
  // Use a more opaque background to compensate for the missing blur effect.
  const rawCardBg = variant?.cardBg ?? 'bg-white/40 dark:bg-white/[0.07] backdrop-blur-xl';
  const cardBg = videoSrc
    ? stripBackdropBlur(rawCardBg) + ' bg-white/85 dark:bg-gray-900/85'
    : rawCardBg;

  return (
    <div className={`min-h-screen flex items-center justify-center ${variant?.background ?? 'bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950'} px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden transition-colors duration-500`}>
      {/* Floating background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] text-rose-300 opacity-20 dark:opacity-10 text-6xl animate-[float-1_8s_ease-in-out_infinite]">💕</div>
        <div className="absolute top-[20%] right-[10%] text-pink-300 opacity-20 dark:opacity-10 text-5xl animate-[float-2_10s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-[15%] left-[15%] text-rose-300 opacity-20 dark:opacity-10 text-5xl animate-[float-3_9s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>💖</div>
        <div className="absolute bottom-[25%] right-[8%] text-pink-300 opacity-20 dark:opacity-10 text-6xl animate-[float-1_11s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }}>💝</div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        {/* Liquid glass card */}
        <div className={`${cardBg} rounded-3xl shadow-2xl ${variant?.shadowColor ?? 'shadow-rose-200/50 dark:shadow-black/30'} p-6 sm:p-10 lg:p-12 border border-white/60 dark:border-white/[0.12] relative overflow-hidden min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] flex flex-col justify-center transition-colors duration-500`}>
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 dark:from-white/[0.08] via-transparent to-transparent pointer-events-none" />

          <div className="space-y-6 sm:space-y-8 lg:space-y-10 relative w-full">
            {videoSrc && (
              <div className="flex justify-center motion-reduce:hidden">
                <video
                  key={videoSrc}
                  ref={registerVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="auto"
                  src={import.meta.env.BASE_URL + videoSrc}
                  className="rounded-2xl max-h-48 sm:max-h-56 lg:max-h-64 w-auto object-contain"
                />
              </div>
            )}
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${variant?.textColor ?? 'text-rose-900 dark:text-rose-100'} text-center leading-tight`}>
              {questionText}
            </h2>

            {/* Divider with liquid effect */}
            <div className="relative h-px">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-400 dark:via-rose-500/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-300 to-transparent blur-sm" />
            </div>

            <div className="space-y-4 sm:space-y-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
