'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const LINK_DISTANCE = 130;
const MOUSE_RADIUS = 160;

/**
 * Atoms forming a dynamic lattice: a lightweight 2D-canvas particle system
 * with energy lines between neighbouring "atoms", Brownian-like drift and
 * gentle mouse interaction. Adapts particle count to viewport size and
 * respects prefers-reduced-motion (renders a single static frame).
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let particles: Particle[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Adaptive density: fewer atoms on small screens
      const count = Math.min(90, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.6,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reducedMotion) {
          // Brownian-like jitter
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
          // Speed limit
          p.vx = Math.max(-0.4, Math.min(0.4, p.vx));
          p.vy = Math.max(-0.4, Math.min(0.4, p.vy));

          // Gentle mouse repulsion — the lattice yields to the observer
          const dxm = p.x - mouse.x;
          const dym = p.y - mouse.y;
          const dm = Math.hypot(dxm, dym);
          if (dm < MOUSE_RADIUS && dm > 0.01) {
            const f = ((MOUSE_RADIUS - dm) / MOUSE_RADIUS) * 0.03;
            p.vx += (dxm / dm) * f;
            p.vy += (dym / dm) * f;
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
          p.y = Math.max(0, Math.min(height, p.y));
        }
      }

      // Energy lines between neighbouring atoms
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            const alpha = (1 - d / LINK_DISTANCE) * 0.18;
            ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Atoms
      for (const p of particles) {
        ctx.fillStyle = 'rgba(0, 245, 212, 0.45)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion && !document.hidden) {
        raf = requestAnimationFrame(step);
      }
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      init();
      if (reducedMotion) step();
    };
    const onVisibility = () => {
      if (!document.hidden && !reducedMotion) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      }
    };

    init();
    step();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseout', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
