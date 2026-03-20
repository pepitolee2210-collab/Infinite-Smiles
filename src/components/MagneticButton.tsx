import React, { useRef, useState, useMemo } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  as?: "button" | "a" | "div";
  href?: string;
}

const isTouch = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);

export default function MagneticButton({ children, className = "", type = "button", onClick, as = "button", href }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const MotionComponent = useMemo(() => motion.create(as as any), [as]);

  if (isTouch) {
    const Tag = as;
    return (
      <Tag
        type={as === "button" ? type : undefined}
        href={as === "a" ? href : undefined}
        onClick={onClick}
        className={`relative overflow-hidden ${className}`}
      >
        {children}
      </Tag>
    );
  }

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    setPosition({ x: (clientX - (left + width / 2)) * 0.2, y: (clientY - (top + height / 2)) * 0.2 });
  };

  return (
    <MotionComponent
      ref={ref}
      type={as === "button" ? type : undefined}
      href={as === "a" ? href : undefined}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </MotionComponent>
  );
}
