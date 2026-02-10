import { useState, useEffect } from 'react';
import { config } from '../../config/config';

interface ScoreRevealProps {
  onContinue: () => void;
}

export function ScoreReveal({ onContinue }: ScoreRevealProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = 100 / steps;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setDisplayScore(100);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] text-rose-300 opacity-20 text-6xl animate-[float-1_8s_ease-in-out_infinite]">💕</div>
        <div className="absolute top-[20%] right-[10%] text-pink-300 opacity-20 text-5xl animate-[float-2_10s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-[15%] left-[15%] text-rose-300 opacity-20 text-5xl animate-[float-3_9s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>💖</div>
        <div className="absolute bottom-[25%] right-[8%] text-pink-300 opacity-20 text-6xl animate-[float-1_11s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }}>💝</div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Liquid glass card */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-rose-200/50 p-8 sm:p-12 border border-white/60 relative overflow-hidden">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
          
          <div className="text-center relative">
            <div className="mb-8">
              <div className="inline-block relative">
                {/* Glow effect behind score */}
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 opacity-30 animate-pulse" />
                
                <div className="relative text-8xl sm:text-9xl font-bold bg-gradient-to-br from-rose-600 via-pink-500 to-rose-600 bg-clip-text text-transparent mb-4">
                  {displayScore}%
                </div>
                <div className="absolute -top-4 -right-4 text-4xl animate-[bounce_1s_ease-in-out_infinite]">
                  💕
                </div>
                <div className="absolute -bottom-2 -left-4 text-3xl animate-[bounce_1s_ease-in-out_0.2s_infinite]">
                  ✨
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-4">
              {config.scoreReveal.title}
            </h1>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-inner mb-8">
              <p className="text-lg sm:text-xl text-rose-900 leading-relaxed font-medium">
                {config.scoreReveal.message}
              </p>
            </div>

            <button
              type="button"
              onClick={onContinue}
              className="group relative px-8 sm:px-10 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white text-lg font-bold rounded-full shadow-lg shadow-rose-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/60 active:scale-95 overflow-hidden"
            >
              {/* Glass shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{config.scoreReveal.continueButton} 💌</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
