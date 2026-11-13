import { useState, useEffect, useCallback, useRef } from 'react';

const TRANSITION_LOCK_MS = 600;

export function useDiscreteSwipe(totalSections: number) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const lastSwipeTimeRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  const goToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections) return;
    const now = Date.now();
    if (now - lastSwipeTimeRef.current < TRANSITION_LOCK_MS) return;

    lastSwipeTimeRef.current = now;
    isTransitioningRef.current = true;
    setCurrentIndex(index);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, TRANSITION_LOCK_MS);
  }, [totalSections]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastSwipeTimeRef.current < TRANSITION_LOCK_MS || isTransitioningRef.current) {
        return;
      }

      if (Math.abs(e.deltaY) > 25) {
        if (e.deltaY > 0) {
          goToSection(currentIndex + 1);
        } else {
          goToSection(currentIndex - 1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToSection(currentIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSection(currentIndex - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartYRef.current - touchEndY;
      if (Math.abs(diffY) > 40) {
        if (diffY > 0) {
          goToSection(currentIndex + 1);
        } else {
          goToSection(currentIndex - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, goToSection]);

  return { currentIndex, goToSection };
}
