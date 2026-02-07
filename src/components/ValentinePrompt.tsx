import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ValentinePromptProps {
  onYes: () => void;
}

export function ValentinePrompt({ onYes }: ValentinePromptProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (noButtonRef.current && !isPositioned) {
      const rect = noButtonRef.current.getBoundingClientRect();
      setNoButtonPosition({ x: rect.left, y: rect.top });
      setIsPositioned(true);
    }
  }, [isPositioned]);

  const handleYesClick = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff1744', '#ff5252', '#ff6e40', '#ff9100', '#ffc400'],
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff1744', '#ff5252', '#ff6e40', '#ff9100', '#ffc400'],
      });
    }, 250);

    setTimeout(() => {
      onYes();
    }, 500);
  };

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const moveNoButton = (pointerX: number, pointerY: number) => {
    if (!noButtonRef.current || !containerRef.current) return;

    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const distance = calculateDistance(pointerX, pointerY, buttonCenterX, buttonCenterY);

    const DODGE_THRESHOLD_PX = 50;
    if (distance < DODGE_THRESHOLD_PX) {
      const angle = Math.atan2(buttonCenterY - pointerY, buttonCenterX - pointerX);
      
      const moveDistance = 100 + Math.random() * 50;
      let newX = buttonCenterX + Math.cos(angle) * moveDistance;
      let newY = buttonCenterY + Math.sin(angle) * moveDistance;

      const padding = 20;
      const maxX = containerRect.width - buttonRect.width - padding;
      const maxY = containerRect.height - buttonRect.height - padding;
      
      newX = Math.max(padding, Math.min(newX - containerRect.left, maxX));
      newY = Math.max(padding, Math.min(newY - containerRect.top, maxY));

      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    moveNoButton(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      if (touch) {
        moveNoButton(touch.clientX, touch.clientY);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 px-4 overflow-hidden"
    >
      <div className="max-w-2xl w-full text-center relative">
        <div className="mb-12">
          <div className="text-6xl sm:text-7xl mb-6 animate-[bounce_2s_ease-in-out_infinite]">
            💝
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-rose-900 mb-4">
            Will you be my Valentine?
          </h1>
          <p className="text-lg sm:text-xl text-rose-700">
            You know there's only one right answer... 💕
          </p>
        </div>

        <div className="relative h-32 w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={handleYesClick}
              className="px-12 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 z-10"
            >
              Yes! 💖
            </button>
          </div>

          <button
            ref={noButtonRef}
            type="button"
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            style={
              isPositioned
                ? {
                    position: 'absolute',
                    left: `${noButtonPosition.x}px`,
                    top: `${noButtonPosition.y}px`,
                    transition: 'all 0.3s ease-out',
                  }
                : {}
            }
            className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 text-lg font-semibold rounded-full shadow-lg"
          >
            No
          </button>
        </div>

        <p className="mt-16 text-sm text-rose-600 italic">
          (Try clicking "No" if you dare... 😏)
        </p>
      </div>
    </div>
  );
}
