"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WorkShowcase() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const works = [
    { title: 'Project Nova', tag: 'E-Commerce', emoji: '🛍️', gradient: 'from-purple-600 to-pink-600' },
    { title: 'AI Synthesis', tag: 'SaaS Dashboard', emoji: '🤖', gradient: 'from-blue-600 to-cyan-600' },
    { title: 'Fintech Guardian', tag: 'Mobile App', emoji: '💳', gradient: 'from-pink-600 to-rose-600' },
    { title: 'Community Hub', tag: 'Social Platform', emoji: '🌐', gradient: 'from-violet-600 to-purple-600' },
  ];

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { y: 30, opacity: 0 });
      ScrollTrigger.batch(cardsRef.current, {
        start: 'top 85%',
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 }),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-6xl font-black mb-20 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
        Featured Creations
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {works.map((w, i) => (
          <div
            key={w.title}
            className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
            style={{ transform: `translateY(${Math.max(0, scrollY - 2000) * 0.05 * (i % 2 ? 1 : -1)}px)` }}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${w.gradient} flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
              <div className="text-8xl mb-6 transition-transform duration-500 group-hover:rotate-12">{w.emoji}</div>
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm mb-4 backdrop-blur-sm">{w.tag}</span>
              <h3 className="text-3xl font-bold">{w.title}</h3>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-8">
              <button className="px-8 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:scale-110 transition-transform">
                View Project <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


