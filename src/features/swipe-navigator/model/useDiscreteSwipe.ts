import { useState, useEffect, useCallback, useRef } from 'react';

const TRANSITION_LOCK_MS = 600;
const WHEEL_THRESHOLD = 25;
const TOUCH_THRESHOLD = 40;

type Direction = 1 | -1;

function findScrollableAncestor(target: EventTarget | null, direction: Direction): HTMLElement | null {
  let element = target instanceof Element ? target : null;

  while (element && element !== document.body) {
    const candidate = element as HTMLElement;
    const overflowY = window.getComputedStyle(candidate).overflowY;
    const canOverflow = /(auto|scroll|overlay)/.test(overflowY)
      && candidate.scrollHeight > candidate.clientHeight + 1;

    if (canOverflow) {
      const atTop = candidate.scrollTop <= 1;
      const atBottom = candidate.scrollTop + candidate.clientHeight >= candidate.scrollHeight - 1;
      if ((direction > 0 && !atBottom) || (direction < 0 && !atTop)) return candidate;
    }

    element = element.parentElement;
  }

  return null;
}

export function useDiscreteSwipe(totalSections: number) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const lastSwipeTimeRef = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number; target: EventTarget | null }>({
    x: 0,
    y: 0,
    target: null,
  });

  const goToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections) return;
    const now = Date.now();
    if (now - lastSwipeTimeRef.current < TRANSITION_LOCK_MS || isTransitioningRef.current) return;

    lastSwipeTimeRef.current = now;
    isTransitioningRef.current = true;
    setCurrentIndex(index);

    window.setTimeout(() => {
      isTransitioningRef.current = false;
    }, TRANSITION_LOCK_MS);
  }, [totalSections]);

  useEffect(() => {
    const isLocked = () => isTransitioningRef.current
      || Date.now() - lastSwipeTimeRef.current < TRANSITION_LOCK_MS;

    const handleWheel = (event: WheelEvent) => {
      if (isLocked() || Math.abs(event.deltaY) <= WHEEL_THRESHOLD) return;

      const direction: Direction = event.deltaY > 0 ? 1 : -1;
      if (findScrollableAncestor(event.target, direction)) return;

      event.preventDefault();
      goToSection(currentIndex + direction);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if ((event.key === ' ' || event.key === 'Spacebar') && target?.closest('button, a, [role="button"]')) return;

      let direction: Direction | null = null;
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') direction = 1;
      if (event.key === 'ArrowUp' || event.key === 'PageUp') direction = -1;
      if (!direction) return;

      if (findScrollableAncestor(target, direction)) return;
      event.preventDefault();
      goToSection(currentIndex + direction);
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, target: event.target };
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isLocked()) return;
      const touch = event.changedTouches[0];
      if (!touch) return;

      const { x, y, target } = touchStartRef.current;
      const diffX = x - touch.clientX;
      const diffY = y - touch.clientY;
      if (Math.abs(diffY) <= TOUCH_THRESHOLD || Math.abs(diffY) <= Math.abs(diffX)) return;

      const direction: Direction = diffY > 0 ? 1 : -1;
      if (findScrollableAncestor(target, direction)) return;
      goToSection(currentIndex + direction);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
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
