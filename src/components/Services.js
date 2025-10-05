"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Code, Palette, Globe, Zap, Layers, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function Services() {
  const [activeService, setActiveService] = useState(null);
  
  const services = [
    { 
      icon: Code, 
      title: 'Web Development', 
      desc: 'Architecting digital ecosystems with precision engineering and cutting-edge frameworks.',
      details: 'React, Next.js, TypeScript, Node.js',
      color: '#6366f1',
      gradient: 'from-indigo-500 to-purple-500'
    },
    { 
      icon: Palette, 
      title: 'UI/UX Design', 
      desc: 'Sculpting experiences that marry aesthetic brilliance with psychological precision.',
      details: 'Figma, Design Systems, User Research',
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-500'
    },
    { 
      icon: Layers, 
      title: '3D Experiences', 
      desc: 'Pushing boundaries with dimensional interfaces that defy conventional web limits.',
      details: 'Three.js, WebGL, GLSL, R3F',
      color: '#8b5cf6',
      gradient: 'from-violet-500 to-purple-600'
    },
    { 
      icon: Globe, 
      title: 'Digital Strategy', 
      desc: 'Transforming data narratives into actionable growth trajectories for brands.',
      details: 'Analytics, Market Research, Brand Positioning',
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-500'
    },
    { 
      icon: Zap, 
      title: 'Performance', 
      desc: 'Engineering velocity at scale—where milliseconds define competitive advantage.',
      details: 'Core Web Vitals, CDN, Optimization',
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      icon: TrendingUp, 
      title: 'Growth & SEO', 
      desc: 'Commanding search algorithms and user behavior to amplify digital presence.',
      details: 'Technical SEO, Content Strategy, Conversion',
      color: '#10b981',
      gradient: 'from-emerald-500 to-green-500'
    },
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const orbitRef = useRef(null);
  const centerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate the title on load
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Animate the center hub on load
      gsap.from(centerRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.4
      });

      // Animate the service items on load
      const items = orbitRef.current.querySelectorAll('.orbit-item');
      gsap.from(items, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        delay: 0.6
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleItemClick = (index) => {
    setActiveService(activeService === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 relative overflow-hidden  text-white">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-32">
          <div className="inline-block mb-4 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm">
            <span className="text-sm font-medium tracking-widest text-white/60">WHAT WE DO</span>
          </div>
          <h2 className="text-7xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Where innovation meets execution—crafting digital experiences that resonate and perform
          </p>
        </div>

        <div ref={orbitRef} className="relative w-full max-w-6xl mx-auto" style={{ height: '800px' }}>
          <div 
            ref={centerRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-500/20 to-pink-500/20 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    {activeService !== null ? String(activeService + 1).padStart(2, '0') : '06'}
                  </div>
                  <div className="text-xs text-white/40 font-medium tracking-wider mt-1">
                    {activeService !== null ? 'ACTIVE' : 'SERVICES'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {services.map((service, index) => {
            const angle = (index * 60) - 90;
            const radius = 320;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const isActive = activeService === index;

            return (
              <div
                key={index}
                // FIXED: Removed "transition-all duration-500" to prevent conflict with GSAP's entrance animation.
                className="orbit-item absolute top-1/2 left-1/2" 
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                {/* REVERTED: Using your original SVG logic for the connection line. */}
                <svg
                  className="absolute top-1/2 left-1/2 -z-10 pointer-events-none transition-opacity duration-500"
                  style={{
                    width: '1px',
                    height: `${radius}px`,
                    transform: `translate(-50%, -100%) rotate(${angle + 90}deg)`,
                    transformOrigin: 'bottom center',
                    opacity: isActive ? 0.4 : 0.1
                  }}
                >
                  <line
                    x1="0.5" y1="0" x2="0.5" y2={radius}
                    stroke={service.color} strokeWidth="2" strokeDasharray="5,5"
                  />
                </svg>

                <div
                  onClick={() => handleItemClick(index)}
                  className={`relative cursor-pointer transition-transform duration-500 group ${isActive ? 'scale-110' : 'hover:scale-105'}`}
                >
                  <div className={`
                    w-64 rounded-2xl p-6 border backdrop-blur-xl transition-all duration-500
                    ${isActive 
                      ? 'bg-white/10 border-white/30 shadow-2xl' 
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                    }
                  `}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 bg-gradient-to-br ${service.gradient} ${isActive ? 'scale-110 rotate-12' : 'group-hover:scale-105 group-hover:rotate-6'}`}>
                        <service.icon size={28} className="text-white" />
                      </div>
                      <div className="text-2xl font-black text-white/20">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                    <p className={`text-sm text-white/60 leading-relaxed transition-all duration-500 ${isActive ? 'line-clamp-none' : 'line-clamp-2'}`}>
                      {service.desc}
                    </p>

                    <div className={`overflow-hidden transition-all duration-500 mt-4 ${isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                          {service.details.split(', ').map((tag, i) => (
                            <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-1 rounded-full transition-all duration-500 bg-gradient-to-r ${service.gradient} ${isActive ? 'opacity-100 w-3/4' : 'opacity-0 group-hover:opacity-60'}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-32">
          <p className="text-white/40 mb-6">Ready to transform your digital presence?</p>
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}