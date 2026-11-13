export interface SandParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
  alpha: number;
}

const SAND_PALETTE = [
  '#E6C280', // Golden sand
  '#D4A373', // Sandstone
  '#FAF0CA', // Light dust
  '#C8BDB0', // Cream quartz
  '#B58A63', // Clay
  '#8C7355', // Desert rock
  '#D17A42', // Terracotta
  '#C91D24', // RDR2 Red ember
];

let sandParticles: SandParticle[] = [];
let animId: number | null = null;
let activeCanvas: HTMLCanvasElement | null = null;
let mouse = { x: -9999, y: -9999, active: false };

export function registerSandCanvas(canvas: HTMLCanvasElement | null): void {
  activeCanvas = canvas;
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.active = false;
    });
  }
}

/**
 * Samples pixel coordinate points from visible DOM text elements
 * to form a high-density point cloud (like pwambach WebGL2 particles)
 */
function samplePointsFromElements(elements: HTMLElement[]): { x: number; y: number }[] {
  if (!activeCanvas) return [];
  const offscreen = document.createElement('canvas');
  offscreen.width = activeCanvas.width;
  offscreen.height = activeCanvas.height;
  const octx = offscreen.getContext('2d');
  if (!octx) return [];

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const style = window.getComputedStyle(el);
    octx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    octx.textAlign = 'left';
    octx.textBaseline = 'top';
    octx.fillStyle = '#FFFFFF';

    const text = el.innerText || el.textContent || '';
    if (text) {
      octx.fillText(text, rect.left, rect.top);
    }
  });

  const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height).data;
  const points: { x: number; y: number }[] = [];
  const step = 2; // High-density grid sampling

  for (let y = 0; y < offscreen.height; y += step) {
    for (let x = 0; x < offscreen.width; x += step) {
      const idx = (y * offscreen.width + x) * 4;
      if (imgData[idx + 3] > 110) {
        points.push({ x, y });
      }
    }
  }

  return points;
}

/**
 * Triggers the pwambach-inspired high-density particle sand storm:
 * Words shatter into thousands of sand grains, swirl across the viewport,
 * and converge into the new words!
 */
export function spawnSandFromElements(elements: HTMLElement[]): void {
  if (!activeCanvas) return;

  const points = samplePointsFromElements(elements);
  const particleCount = Math.max(points.length, 12000);
  sandParticles = [];

  for (let i = 0; i < particleCount; i++) {
    const pt = points.length > 0 ? points[i % points.length] : { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };

    // Initial position on the text
    const px = pt.x + (Math.random() - 0.5) * 4;
    const py = pt.y + (Math.random() - 0.5) * 4;

    // Target position (shuffled target)
    const targetPt = points.length > 0 ? points[(i * 7) % points.length] : pt;

    // Explosive radial blast + rightward wind impulse (pwambach physics)
    const angle = Math.random() * Math.PI * 2;
    const blastSpeed = Math.random() * 16 + 4;
    const vx = Math.cos(angle) * blastSpeed + (Math.random() * 8 + 3);
    const vy = Math.sin(angle) * blastSpeed - (Math.random() * 6);

    sandParticles.push({
      x: px,
      y: py,
      vx,
      vy,
      tx: targetPt.x,
      ty: targetPt.y,
      size: Math.random() * 2.2 + 0.9,
      color: SAND_PALETTE[Math.floor(Math.random() * SAND_PALETTE.length)],
      alpha: Math.random() * 0.4 + 0.6,
    });
  }

  startSandLoop();
}

function startSandLoop(): void {
  if (!activeCanvas) return;
  const ctx = activeCanvas.getContext('2d');
  if (!ctx) return;

  if (animId !== null) {
    cancelAnimationFrame(animId);
  }

  let startTime = performance.now();

  function loop(now: number): void {
    if (!activeCanvas || !ctx) return;
    const elapsed = now - startTime;

    ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter'; // Glowing ember sand

    for (let i = 0; i < sandParticles.length; i++) {
      const p = sandParticles[i];

      // 1. Attraction towards target position
      const dx = p.tx - p.x;
      const dy = p.ty - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1.0) {
        const spring = Math.min(dist * 0.075, 12.0);
        p.vx += (dx / dist) * spring;
        p.vy += (dy / dist) * spring;

        // Swirling vortex turbulence
        if (dist > 30.0) {
          p.vx += -dy * 0.008;
          p.vy += dx * 0.008;
        }
      }

      // 2. pwambach Mouse gravity / disturbance physics
      if (mouse.active) {
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140 && mdist > 2) {
          const repulse = (1.0 - mdist / 140) * 12.0;
          p.vx -= (mdx / mdist) * repulse;
          p.vy -= (mdy / mdist) * repulse;
        }
      }

      // 3. Friction & Damping
      p.vx *= 0.88;
      p.vy *= 0.88;
      p.x += p.vx;
      p.y += p.vy;

      // 4. Draw sand particle
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    ctx.restore();

    // Settle after 1200ms
    if (elapsed < 1200) {
      animId = requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
      animId = null;
    }
  }

  animId = requestAnimationFrame(loop);
}
