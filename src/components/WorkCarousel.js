"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  Code2, 
  Palette, 
  Box, 
  TrendingUp,
  Zap,
  BarChart3
} from 'lucide-react';

const carouselSlides = [
  {
    icon: Code2,
    headline: "Web Development",
    body: "Crafting responsive, high-performance web experiences that set new standards for digital excellence.",
    cta: "Explore",
    colors: { primary: "#ffffff", secondary: "#e5e5e5", bg: "from-gray-900 via-gray-800 to-gray-900" },
  },
  {
    icon: Palette,
    headline: "UI/UX Design",
    body: "Designing intuitive interfaces that captivate and engage users with every interaction.",
    cta: "Discover",
    colors: { primary: "#ffffff", secondary: "#e5e5e5", bg: "from-gray-900 via-gray-800 to-gray-900" },
  },
  {
    icon: Box,
    headline: "3D Web Experiences",
    body: "Building immersive worlds with WebGL and Three.js that transport users beyond the screen.",
    cta: "Experience",
    colors: { primary: "#ffffff", secondary: "#e5e5e5", bg: "from-gray-900 via-gray-800 to-gray-900" },
  },
  {
    icon: TrendingUp,
    headline: "Digital Strategy",
    body: "Data-driven insights to elevate your brand's digital footprint and drive measurable growth.",
    cta: "Strategize",
    colors: { primary: "#ffffff", secondary: "#e5e5e5", bg: "from-gray-900 via-gray-800 to-gray-900" },
  },
  {
    icon: Zap,
    headline: "Performance Tuning",
    body: "Optimizing for speed to ensure a seamless user journey across all devices and platforms.",
    cta: "Optimize",
    colors: { primary: "#ffffff", secondary: "#e5e5e5", bg: "from-gray-900 via-gray-800 to-gray-900" },
  },
  {
    icon: BarChart3,
    headline: "SEO & Analytics",
    body: "Maximizing visibility and tracking what matters to transform data into actionable insights.",
    cta: "Analyze",
    colors: { primary: "#ffffff", secondary: "#e5e5e5", bg: "from-gray-900 via-gray-800 to-gray-900" },
  }
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const angleIncrement = 360 / carouselSlides.length;

  useEffect(() => {
    const animate = () => {
      if (!isDragging && Math.abs(momentum) > 0.05) {
        setRotation(prev => prev + momentum);
        setMomentum(prev => prev * 0.92);
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    if (momentum !== 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [momentum, isDragging]);

  useEffect(() => {
    const targetRotation = -currentIndex * angleIncrement;
    const diff = targetRotation - rotation;
    setRotation(targetRotation);
  }, [currentIndex]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setMomentum(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setRotation(prev => prev + diff * 0.2);
    setMomentum(diff * 0.05);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const closestIndex = Math.round(normalizedRotation / angleIncrement) % carouselSlides.length;
    setCurrentIndex(carouselSlides.length - closestIndex);
  };

  const handleSlideClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Carousel Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-7xl h-[600px] perspective-2000"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ perspective: '2000px', cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="relative w-full h-full preserve-3d transition-transform duration-1000 ease-out"
          style={{ 
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {carouselSlides.map((slide, index) => {
            const Icon = slide.icon;
            const angle = angleIncrement * index;
            const isActive = index === currentIndex;
            const distance = 650;
            
            // Calculate if card is behind the camera
            const normalizedRotation = ((rotation % 360) + 360) % 360;
            const cardRotation = ((angle - normalizedRotation) % 360 + 360) % 360;
            const isVisible = cardRotation < 90 || cardRotation > 270;
            
            if (!isVisible) return null;
            
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-[450px] h-[500px] -translate-x-1/2 -translate-y-1/2 preserve-3d cursor-pointer"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${distance}px)`,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => handleSlideClick(index)}
              >
                {/* Card with Glass Morphism */}
                <div 
                  className={`relative w-full h-full rounded-3xl overflow-hidden transition-all duration-500 ${
                    isActive ? 'scale-110 shadow-2xl' : 'scale-90 opacity-60'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${slide.colors.bg})`,
                    boxShadow: isActive ? `0 0 80px ${slide.colors.primary}80` : 'none'
                  }}
                >
                  {/* Animated Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-float"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${3 + Math.random() * 4}s`,
                          background: slide.colors.primary,
                          opacity: 0.3
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-10 text-white text-center gap-6 z-10">
                    {/* Icon with Glow */}
                    <div 
                      className="relative"
                      style={{
                        filter: `drop-shadow(0 0 30px ${slide.colors.primary})`
                      }}
                    >
                      <Icon size={120} strokeWidth={1.5} className="animate-pulse-slow" />
                      <div 
                        className="absolute inset-0 blur-2xl opacity-50"
                        style={{ background: slide.colors.primary }}
                      ></div>
                    </div>
                    
                    {/* Text */}
                    <h2 className="text-4xl font-black tracking-tight leading-tight">
                      {slide.headline}
                    </h2>
                    <p className="text-lg font-light leading-relaxed opacity-90">
                      {slide.body}
                    </p>
                    
                    {/* CTA Button */}
                    <button 
                      className="relative mt-4 px-8 py-4 rounded-full font-bold text-lg overflow-hidden group transition-transform hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${slide.colors.primary}, ${slide.colors.secondary})`,
                        boxShadow: `0 10px 40px ${slide.colors.primary}40`
                      }}
                    >
                      <span className="relative z-10 text-black">{slide.cta}</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                  </div>

                  {/* Border Glow */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 rounded-3xl pointer-events-none border-2"
                      style={{
                        borderColor: slide.colors.primary,
                        boxShadow: `inset 0 0 40px ${slide.colors.primary}60, 0 0 80px ${slide.colors.primary}80`
                      }}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {carouselSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="relative group"
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'scale-150' : 'scale-100 opacity-50'
              }`}
              style={{
                background: currentIndex === index ? slide.colors.primary : '#fff',
                boxShadow: currentIndex === index ? `0 0 20px ${slide.colors.primary}` : 'none'
              }}
            ></div>
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-light tracking-widest">
        DRAG TO ROTATE • CLICK TO SELECT
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(10px); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .perspective-2000 {
          perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
}