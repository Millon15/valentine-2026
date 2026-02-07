interface ScoreRevealProps {
  onContinue: () => void;
}

export function ScoreReveal({ onContinue }: ScoreRevealProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 px-4">
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
        <div className="mb-8">
          <div className="inline-block relative">
            <div className="text-8xl sm:text-9xl font-bold text-rose-500 mb-4 animate-[scale-in_0.6s_ease-out]">
              100%
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
          Perfect Match!
        </h1>
        <p className="text-lg sm:text-xl text-rose-700 mb-8 leading-relaxed">
          Your answers reveal something beautiful—you're absolutely perfect for each other.
          Every response shows the depth of your connection.
        </p>

        <button
          type="button"
          onClick={onContinue}
          className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          See Your Love Letter 💌
        </button>
      </div>
    </div>
  );
}
