import React from 'react';

interface QuestionCardProps {
  designVariant: string;
  questionText: string;
  videoSrc?: string;
  children: React.ReactNode;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionText,
  videoSrc,
  children,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
      {/* Animated background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] text-rose-300 opacity-20 animate-pulse text-6xl">💕</div>
        <div className="absolute top-[20%] right-[10%] text-pink-300 opacity-20 animate-pulse text-5xl" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-[15%] left-[15%] text-rose-300 opacity-20 animate-pulse text-5xl" style={{ animationDelay: '2s' }}>💖</div>
        <div className="absolute bottom-[25%] right-[8%] text-pink-300 opacity-20 animate-pulse text-6xl" style={{ animationDelay: '1.5s' }}>💝</div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        {/* Liquid glass card */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-rose-200/50 p-6 sm:p-10 lg:p-12 border border-white/60 relative overflow-hidden">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
          
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 relative">
            {videoSrc && (
              <div className="flex justify-center motion-reduce:hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={import.meta.env.BASE_URL + videoSrc}
                  className="rounded-2xl max-h-48 sm:max-h-56 lg:max-h-64 w-auto object-contain"
                />
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-rose-900 text-center leading-tight">
              {questionText}
            </h2>

            {/* Divider with liquid effect */}
            <div className="relative h-px">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
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
