"use client";
import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SplineSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top top', end: 'bottom top', pin: true, scrub: 0.5 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen">
      {/* Cohesive background to match site */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Spline Canvas with gentle grading to blend */}
      <div className="absolute inset-0 [filter:saturate(0.9)_contrast(0.95)_brightness(0.9)]">
        <Spline
          scene="https://prod.spline.design/bURuBcZJbzCdpXFv/scene.splinecode"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      {/* Soft gradient overlays for blending */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-70" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.0) 70%)',
          }}
        />
      </div>

      {/* Matching floating orbs like in the hero for visual continuity */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-15"
            style={{
              background: `radial-gradient(circle, ${['#8A2BE2', '#4B0082', '#FF00FF', '#9400D3'][i]}, transparent)`,
              left: `${15 + i * 20}%`,
              top: `${25 + Math.sin(i) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Info cards */}
      <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-xs z-10">
        <h3 className="text-xl font-bold mb-2 text-cyan-400">Fully Interactive</h3>
        <p className="text-sm text-white/80">Drag to rotate, scroll to zoom, explore the 3D space</p>
      </div>

      <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-xs z-10">
        <h3 className="text-xl font-bold mb-2 text-pink-400">Real-time 3D</h3>
        <p className="text-sm text-white/80">Powered by Spline for smooth, GPU-accelerated graphics</p>
      </div>

      {/* Force transparent canvas background to blend with site theme */}
      <style jsx>{`
        :global(canvas) { background: transparent !important; }
      `}</style>
    </section>
  );
}


