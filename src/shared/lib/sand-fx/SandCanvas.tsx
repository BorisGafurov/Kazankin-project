import React, { useEffect, useRef } from 'react';
import { registerSandCanvas } from './sandParticleEngine';

export const SandCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    registerSandCanvas(canvasRef.current);

    const handleResize = () => {
      registerSandCanvas(canvasRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      registerSandCanvas(null);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="sandCanvas"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 'var(--z-sand-canvas)',
      }}
      aria-hidden="true"
    />
  );
};
