import { useCallback, useEffect, useRef } from 'react';

/**
 * Minimal autoplay hook.
 *
 * The heavy lifting is done by the HTML attributes on the <video> element:
 *   autoPlay, muted, playsInline, preload="auto"
 *
 * This hook adds:
 *   1. A single canplay-based play() nudge (some browsers need it)
 *   2. Unmute on first user interaction (all platforms)
 *
 * On iOS, autoplay MUST start muted (Apple policy). Once the user
 * interacts with the page, we attempt to unmute. If that fails
 * (e.g. gesture context expired), we silently re-mute and continue.
 */
export function useVideoAutoplay() {
  const videoRefs = useRef<Set<HTMLVideoElement>>(new Set());

  const hasInteracted = useRef(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;

      videoRefs.current.forEach(video => {
        // Unmute on first user interaction (works on all platforms).
        // iOS requires the play() call to be inside a direct gesture handler.
        // If unmuting fails, re-mute and resume — no playback is lost.
        video.muted = false;
        const p = video.play();
        if (p !== undefined) {
          p.catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      });
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      videoRefs.current.clear();
    };
  }, []);

  const registerVideo = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;

    videoRefs.current.add(video);

    if (hasInteracted.current) {
      // If user already interacted, try unmuting immediately
      video.muted = false;
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }

    // Single play attempt once the browser has enough data.
    const onReady = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    video.addEventListener('canplay', onReady, { once: true });
  }, []);

  return { registerVideo };
}
