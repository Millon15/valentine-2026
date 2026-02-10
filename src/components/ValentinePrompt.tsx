import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { config } from '../../config/config';

interface ValentinePromptProps {
  onYes: (noCount: number) => void;
  hideNoButton?: boolean;
}

export function ValentinePrompt({ onYes, hideNoButton }: ValentinePromptProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 20, y: 70 });
  const [isChasing, setIsChasing] = useState(false);
  const [buttonScale, setButtonScale] = useState(1);
  const [policeFlicker, setPoliceFlicker] = useState(false);
  const [noButtonOpacity, setNoButtonOpacity] = useState(1);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noClickMessage, setNoClickMessage] = useState<string | null>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const scaleIntervalRef = useRef<number | null>(null);
  const flickerIntervalRef = useRef<number | null>(null);

  const handleYesClick = () => {
    setIsYesClicked(true);

    // Stop chase mode effects
    stopSizeAnimation();
    stopPoliceFlicker();
    setIsChasing(false);
    setButtonScale(0);
    setNoButtonOpacity(0);

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
      onYes(noClickCount);
    }, 500);
  };

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const moveNoButton = (pointerX: number, pointerY: number) => {
    if (!noButtonRef.current || !buttonContainerRef.current) return;

    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const containerRect = buttonContainerRef.current.getBoundingClientRect();
    
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const distance = calculateDistance(pointerX, pointerY, buttonCenterX, buttonCenterY);

    const DODGE_THRESHOLD_PX = 180;
    if (distance < DODGE_THRESHOLD_PX) {
      if (!isChasing) {
        setIsChasing(true);
        setNoClickCount(prev => prev + 1);
        startSizeAnimation();
        startPoliceFlicker();
      }

      const angle = Math.atan2(buttonCenterY - pointerY, buttonCenterX - pointerX);
      
      const moveDistance = 400 + Math.random() * 300;
      let newX = buttonCenterX + Math.cos(angle) * moveDistance;
      let newY = buttonCenterY + Math.sin(angle) * moveDistance;

      const padding = 20;
      const maxX = containerRect.width - buttonRect.width - padding;
      const maxY = containerRect.height - buttonRect.height - padding;
      
      newX = Math.max(padding, Math.min(newX - containerRect.left, maxX));
      newY = Math.max(padding, Math.min(newY - containerRect.top, maxY));

      setNoButtonPosition({ x: newX, y: newY });
    } else if (distance > DODGE_THRESHOLD_PX * 2.5) {
      // Stop chase mode when far away
      if (isChasing) {
        setIsChasing(false);
        stopSizeAnimation();
        stopPoliceFlicker();
        setButtonScale(1);
      }
    }
  };

  const startSizeAnimation = () => {
    if (scaleIntervalRef.current) return;
    
    let scaleIndex = 0;
    const scales = [1.2, 0.8, 1.4, 0.7, 1.3, 0.9, 1.5]; // Random size changes
    
    scaleIntervalRef.current = window.setInterval(() => {
      setButtonScale(scales[scaleIndex % scales.length]!);
      scaleIndex++;
    }, 300);
  };

  const stopSizeAnimation = () => {
    if (scaleIntervalRef.current) {
      clearInterval(scaleIntervalRef.current);
      scaleIntervalRef.current = null;
    }
  };

  const startPoliceFlicker = () => {
    if (flickerIntervalRef.current) return;
    
    flickerIntervalRef.current = window.setInterval(() => {
      setPoliceFlicker((prev) => !prev);
    }, 200);
  };

  const stopPoliceFlicker = () => {
    if (flickerIntervalRef.current) {
      clearInterval(flickerIntervalRef.current);
      flickerIntervalRef.current = null;
      setPoliceFlicker(false);
    }
  };

  useEffect(() => {
    const cleanupSizeAnimation = () => {
      if (scaleIntervalRef.current) {
        clearInterval(scaleIntervalRef.current);
        scaleIntervalRef.current = null;
      }
    };

    const cleanupPoliceFlicker = () => {
      if (flickerIntervalRef.current) {
        clearInterval(flickerIntervalRef.current);
        flickerIntervalRef.current = null;
        setPoliceFlicker(false);
      }
    };

    return () => {
      cleanupSizeAnimation();
      cleanupPoliceFlicker();
    };
  }, []);

  const NO_CLICK_MESSAGES = config.valentine.noClickMessages;

  const handleNoClick = () => {
    const message = NO_CLICK_MESSAGES[noClickCount % NO_CLICK_MESSAGES.length];
    setNoClickMessage(message!);
    setNoClickCount(prev => prev + 1);

    // Move the button to a random position within the container
    if (buttonContainerRef.current && noButtonRef.current) {
      const containerRect = buttonContainerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      const padding = 20;
      const maxX = containerRect.width - buttonRect.width - padding;
      const maxY = containerRect.height - buttonRect.height - padding;
      const newX = padding + Math.random() * Math.max(0, maxX - padding);
      const newY = padding + Math.random() * Math.max(0, maxY - padding);
      setNoButtonPosition({ x: newX, y: newY });
    }

    // Clear the message after 2 seconds
    setTimeout(() => {
      setNoClickMessage(null);
    }, 2000);
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden"
    >
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
            <div className="mb-8 sm:mb-12">
              <div className="text-6xl sm:text-7xl mb-6 animate-[bounce_2s_ease-in-out_infinite]">
                💝
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-rose-900 mb-4">
                {config.valentine.question}
              </h1>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-inner inline-block">
                <p className="text-lg sm:text-xl text-rose-900 font-medium">
                  {config.valentine.subtitle} 💕
                </p>
              </div>
            </div>

            <div ref={buttonContainerRef} className="relative h-32 w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleYesClick}
                  className="group relative px-12 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white text-xl font-bold rounded-full shadow-2xl shadow-rose-400/50 transition-all duration-300 hover:scale-110 hover:shadow-rose-500/60 active:scale-95 z-10 overflow-hidden"
                >
                  {/* Glass shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">{config.valentine.yesButton} 💖</span>
                </button>
              </div>

              {!hideNoButton && (
              <button
                ref={noButtonRef}
                type="button"
                onClick={handleNoClick}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={(e: React.TouchEvent) => {
                  if (e.touches.length > 0) {
                    const touch = e.touches[0];
                    if (touch) {
                      moveNoButton(touch.clientX, touch.clientY);
                    }
                  }
                }}
                style={{
                  position: 'absolute',
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`,
                  transition: isYesClicked ? 'transform 0.5s ease-in, opacity 0.4s ease-in' : 'all 0.1s ease-out',
                  transform: `scale(${buttonScale}) rotate(${isYesClicked ? '180deg' : '0deg'})`,
                  opacity: noButtonOpacity,
                  backgroundColor: policeFlicker ? '#ef4444' : '#3b82f6',
                  boxShadow: policeFlicker
                    ? '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.6)'
                    : '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6)',
                }}
                className="px-4 py-2 text-white text-sm font-normal rounded border-2 border-gray-400 hover:border-gray-500 cursor-pointer"
              >
                {config.valentine.noButton}
              </button>
              )}
            </div>

            {noClickMessage && (
              <div className="absolute inset-x-0 flex justify-center" style={{ top: '50%' }}>
                <div className="bg-white/90 backdrop-blur-sm text-rose-600 font-semibold px-6 py-3 rounded-full shadow-lg border border-rose-200 animate-[fadeIn_0.3s_ease-out]">
                  {noClickMessage}
                </div>
              </div>
            )}

            <p className="mt-12 sm:mt-16 text-sm text-rose-700 italic bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block border border-white/40">
              {config.valentine.hintText} 😏
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
