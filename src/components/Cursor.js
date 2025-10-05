"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const qx = gsap.quickTo(cursorRef.current, 'left', { duration: 0.25, ease: 'power3.out' });
    const qy = gsap.quickTo(cursorRef.current, 'top', { duration: 0.25, ease: 'power3.out' });
    const handleMouseMove = (e) => { qx(e.clientX); qy(e.clientY); };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-3 h-3 bg-purple-400 rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100"
      style={{ willChange: 'transform' }}
    />
  );
}


