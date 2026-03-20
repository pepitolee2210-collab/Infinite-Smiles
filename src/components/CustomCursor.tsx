import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    let raf: number;
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = !!(target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button'));
    };

    const loop = () => {
      if (dotRef.current) {
        const s = isHovering.current ? 3 : 1;
        dotRef.current.style.transform = `translate(${pos.current.x - 8}px, ${pos.current.y - 8}px) scale(${s})`;
      }
      if (ringRef.current) {
        const s = isHovering.current ? 1.5 : 1;
        ringRef.current.style.transform = `translate(${pos.current.x - 24}px, ${pos.current.y - 24}px) scale(${s})`;
        ringRef.current.style.opacity = isHovering.current ? '0' : '1';
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-12 h-12 border border-white/50 rounded-full pointer-events-none z-[99] mix-blend-difference transition-opacity duration-200"
        style={{ willChange: 'transform, opacity' }}
      />
    </>
  );
}
