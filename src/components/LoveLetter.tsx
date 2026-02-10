import { config } from '../../config/config';

interface LoveLetterProps {
  letterSegments: string[];
  onContinue: () => void;
}

export function LoveLetter({ letterSegments, onContinue }: LoveLetterProps) {
  const validSegments = letterSegments.filter(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] text-rose-300 opacity-20 text-6xl animate-[float-1_8s_ease-in-out_infinite]">💕</div>
        <div className="absolute top-[20%] right-[10%] text-pink-300 opacity-20 text-5xl animate-[float-2_10s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-[15%] left-[15%] text-rose-300 opacity-20 text-5xl animate-[float-3_9s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>💖</div>
        <div className="absolute bottom-[25%] right-[8%] text-pink-300 opacity-20 text-6xl animate-[float-1_11s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }}>💝</div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        {/* Liquid glass card */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-rose-200/50 p-8 sm:p-12 border border-white/60 relative overflow-hidden">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="text-center mb-8">
              <div className="text-4xl sm:text-5xl mb-4">💌</div>
              <h1 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-4">
                {config.loveLetter.heading}
              </h1>
              {/* Divider with liquid effect */}
              <div className="relative h-px w-24 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-300 to-transparent blur-sm" />
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/40 shadow-inner">
              <div className="prose prose-lg max-w-none leading-relaxed space-y-6">
                <p
                  className="text-xl font-serif text-rose-900 mb-6 font-medium animate-[fadeIn_0.6s_ease-out]"
                  style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                >
                  Dear {config.recipientName},
                </p>

                {validSegments.map((segment, index) => (
                  <p
                    key={segment.slice(0, 30)}
                    className="font-serif text-rose-800 text-lg leading-relaxed animate-[fadeIn_0.6s_ease-out]"
                    style={{ animationDelay: `${(index + 1) * 0.4}s`, animationFillMode: 'both' }}
                  >
                    {segment}
                  </p>
                ))}

                <div
                  className="mt-8 pt-6 border-t border-rose-300/50 animate-[fadeIn_0.6s_ease-out]"
                  style={{ animationDelay: `${(validSegments.length + 1) * 0.4}s`, animationFillMode: 'both' }}
                >
                  <p className="font-serif text-lg text-rose-900 font-medium">
                    {config.loveLetter.closing}
                  </p>
                  <p className="font-serif text-xl text-rose-900 mt-2 italic font-semibold">
                    {config.loveLetter.signaturePrefix} {config.senderName} ❤️
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-10">
              <button
                type="button"
                onClick={onContinue}
                className="group relative px-8 sm:px-10 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white text-lg font-bold rounded-full shadow-lg shadow-rose-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/60 active:scale-95 overflow-hidden"
              >
                {/* Glass shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">{config.loveLetter.continueButton} 💌</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
