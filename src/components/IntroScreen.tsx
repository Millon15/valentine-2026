import React from 'react';
import { config } from '../../config/config';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] text-rose-300 opacity-20 text-6xl animate-[float-1_8s_ease-in-out_infinite]">💕</div>
        <div className="absolute top-[20%] right-[10%] text-pink-300 opacity-20 text-5xl animate-[float-2_10s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-[15%] left-[15%] text-rose-300 opacity-20 text-5xl animate-[float-3_9s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>💖</div>
        <div className="absolute bottom-[25%] right-[8%] text-pink-300 opacity-20 text-6xl animate-[float-1_11s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }}>💝</div>
      </div>

      {/* Hidden video preload for slow connections */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <video preload="auto" src={import.meta.env.BASE_URL + 'videos/1-cat-piano.webm'} />
        <video preload="auto" src={import.meta.env.BASE_URL + 'videos/2-cat-funny-clip.webm'} />
        <video preload="auto" src={import.meta.env.BASE_URL + 'videos/3-cat-japanese.webm'} />
        <video preload="auto" src={import.meta.env.BASE_URL + 'videos/4-tyn-tyn.webm'} />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Liquid glass card */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-rose-200/50 p-8 sm:p-12 lg:p-16 border border-white/60 relative overflow-hidden">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
          
          <div className="text-center space-y-4 sm:space-y-6 relative">
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-rose-700 font-medium tracking-wide">
              {config.intro.greeting}
            </p>

            {/* RECIPIENT NAME - HUGE with decorations */}
            <div className="relative py-6 sm:py-8">
              {/* Decorative hearts around name */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl animate-bounce">
                💖
              </div>
              <div className="absolute top-1/2 left-0 sm:left-[-20px] -translate-y-1/2 text-2xl sm:text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>
                ✨
              </div>
              <div className="absolute top-1/2 right-0 sm:right-[-20px] -translate-y-1/2 text-2xl sm:text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>
                ✨
              </div>
              <div className="absolute bottom-0 left-[20%] translate-y-1/2 text-xl sm:text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>
                💕
              </div>
              <div className="absolute bottom-0 right-[20%] translate-y-1/2 text-xl sm:text-2xl animate-bounce" style={{ animationDelay: '0.7s' }}>
                💕
              </div>

              {/* Recipient's name with liquid glass effect */}
              <div className="relative inline-block">
                {/* Glow effect behind name */}
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 opacity-30 animate-pulse" />
                
                <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-br from-rose-600 via-pink-500 to-rose-600 bg-clip-text text-transparent drop-shadow-2xl tracking-tight animate-[scale-in_0.6s_ease-out] px-4 leading-[1.2]">
                  {config.recipientName}
                </h1>
                
                {/* Sparkle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Divider with liquid effect */}
            <div className="relative h-px">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-300 to-transparent blur-sm" />
            </div>

            {/* Message with glass effect */}
            <div className="space-y-4 sm:space-y-5 bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-inner">
              <p className="text-lg sm:text-xl text-rose-900 leading-relaxed font-medium">
                {config.intro.message}
              </p>
              <p className="text-base sm:text-lg text-rose-700 leading-relaxed">
                {config.intro.instruction}
              </p>
            </div>

            {/* Button with enhanced liquid glass */}
            <button
              type="button"
              onClick={onStart}
              className="group relative mt-6 sm:mt-8 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white text-lg sm:text-xl font-bold rounded-full shadow-lg shadow-rose-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/60 active:scale-95 overflow-hidden"
            >
              {/* Glass shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{config.intro.startButton} 💝</span>
            </button>

            <p className="text-sm sm:text-base text-rose-600 mt-4 sm:mt-6 bg-white/30 backdrop-blur-sm rounded-full px-6 py-2 inline-block border border-white/40">
              {config.intro.timeEstimate} • Made with love by {config.senderName} 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
