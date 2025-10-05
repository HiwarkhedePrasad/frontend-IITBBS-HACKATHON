"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomLoader() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const rect1Ref = useRef(null);
  const rect2Ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // GSAP Context for safe cleanup
    const ctx = gsap.context(() => {
      // --- MOUSE FOLLOW EFFECT ---
      // Use GSAP's quickTo for a smoother, more performant mouse follow
      const xTo = gsap.quickTo(containerRef.current, "x", { duration: 0.8, ease: "power3.out" });
      const yTo = gsap.quickTo(containerRef.current, "y", { duration: 0.8, ease: "power3.out" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = gsap.utils.mapRange(0, innerWidth, -25, 25, clientX);
        const y = gsap.utils.mapRange(0, innerHeight, -25, 25, clientY);
        xTo(x);
        yTo(y);
      };
      window.addEventListener('mousemove', handleMouseMove);

      // --- MAIN ANIMATION TIMELINE ---
      const tl = gsap.timeline();

      // 1. Initial State (elements are hidden and off-screen)
      gsap.set([rect1Ref.current, rect2Ref.current, circleRef.current, textRef.current], { autoAlpha: 0 });
      gsap.set(rect1Ref.current, { rotation: 45, x: -100 });
      gsap.set(rect2Ref.current, { rotation: 45, x: 100 });
      gsap.set(circleRef.current, { scale: 0 });
      gsap.set(textRef.current, { y: 20 });

      // 2. Entrance Animation
      tl.to([rect1Ref.current, rect2Ref.current], {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      })
      .to(circleRef.current, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
      }, "-=0.7")
      .to(textRef.current, {
        y: 0,
        autoAlpha: 0.5, // Faded text look
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.5");

      // 3. Looping Animation (starts after entrance)
      const loop = gsap.timeline({ repeat: -1, yoyo: true, delay: 0.2 });
      loop.to(rect1Ref.current, {
        y: -20,
        rotation: 35,
        ease: "sine.inOut",
        duration: 1.5,
      })
      .to(rect2Ref.current, {
        y: 20,
        rotation: 55,
        ease: "sine.inOut",
        duration: 1.5,
      }, "<") // "<" starts this tween at the same time as the previous one
      .to(circleRef.current, {
        scale: 0.85,
        ease: "sine.inOut",
        duration: 1.5,
      }, "<");

      // --- EXIT ANIMATION ---
      const timer = setTimeout(() => {
        gsap.to(containerRef.current, {
          scale: 0.8,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.in',
          onComplete: () => setVisible(false)
        });
      }, 3500); // Increased time slightly for the new animation

      // Cleanup function
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timer);
        ctx.revert(); // Reverts all GSAP animations within this context
      };
    }, containerRef); // Scope the context to the main container

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#050505] z-[100]">
      <div ref={containerRef} className="relative w-[300px] h-[300px] flex items-center justify-center">
        {/* The two rectangles (styled as pills) */}
        <div ref={rect1Ref} className="absolute w-12 h-24 bg-[#6A0DAD] rounded-full" />
        <div ref={rect2Ref} className="absolute w-12 h-24 bg-[#6A0DAD] rounded-full" />
        
        {/* The central circle */}
        <div ref={circleRef} className="absolute w-20 h-20 bg-[#00FFFF] rounded-full shadow-[0_0_20px_5px_rgba(0,255,255,0.5)]" />
      </div>

      <p ref={textRef} className="absolute text-white/50 text-lg bottom-[30%]">
        Entering the digital cosmos...
      </p>

      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>
    </div>
  );
}