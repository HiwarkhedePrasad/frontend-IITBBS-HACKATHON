"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function BrandMarquee() {
  const brands = ['OpenAI', 'Google', 'Microsoft', 'Meta', 'Amazon', 'Apple'];
  const trackRef = useRef(null);

  useGSAP(() => {
    const el = trackRef.current;
    if (!el) return;
    const totalWidth = el.scrollWidth / 3;
    gsap.set(el, { x: 0 });
    gsap.to(el, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => (parseFloat(x) % -totalWidth)),
      },
    });
  }, []);
  return (
    <section className="py-20 relative">
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        <div ref={trackRef} className="flex gap-16 will-change-transform">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 text-2xl font-medium text-white/50 hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


