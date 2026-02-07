interface LoveLetterProps {
  letterSegments: string[];
  onContinue: () => void;
}

export function LoveLetter({ letterSegments, onContinue }: LoveLetterProps) {
  const validSegments = letterSegments.filter(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 px-4 py-12">
      <div className="max-w-3xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">💌</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-2">
            A Letter For You
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
          <p className="text-xl font-serif text-rose-900 mb-6">
            Dear Tanya,
          </p>

          {validSegments.map((segment) => (
            <p key={segment.slice(0, 30)} className="font-serif text-gray-700 text-lg leading-relaxed">
              {segment}
            </p>
          ))}

          <div className="mt-8 pt-6 border-t border-rose-200">
            <p className="font-serif text-lg text-rose-900">
              With all my love,
            </p>
            <p className="font-serif text-xl text-rose-900 mt-2 italic">
              Forever yours ❤️
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            type="button"
            onClick={onContinue}
            className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Continue 💖
          </button>
        </div>
      </div>
    </div>
  );
}
