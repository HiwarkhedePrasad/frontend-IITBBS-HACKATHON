"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);

  // Initialize particles for background animation
  useEffect(() => {
    const particleCount = 60;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  // Canvas for dynamic line connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    let points = particles.map(p => ({
      x: (p.x / 100) * canvas.width,
      y: (p.y / 100) * canvas.height,
      vx: p.speedX * 2,
      vy: p.speedY * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw points
      points.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Draw connections
        points.forEach((otherPoint, j) => {
          if (i === j) return;
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });

        // Mouse interaction
        const mouseDx = point.x - mousePos.x;
        const mouseDy = point.y - mousePos.y;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (mouseDist < 200) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * (1 - mouseDist / 200)})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      points = particles.map(p => ({
        x: (p.x / 100) * canvas.width,
        y: (p.y / 100) * canvas.height,
        vx: p.speedX * 2,
        vy: p.speedY * 2,
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [particles, mousePos]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1000);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-black">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-50"
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white pointer-events-none shadow-sm shadow-white/50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity * 0.9,
            animation: `float-${particle.id} ${15 + Math.random() * 10}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}

      {/* Gradient Orbs - removed for pure starfield effect */}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Sparkle decorations */}
        <div className="absolute -top-16 left-1/4 animate-pulse">
          <Sparkles className="text-purple-400 w-8 h-8 opacity-60" />
        </div>
        <div className="absolute -top-8 right-1/3 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="text-pink-400 w-6 h-6 opacity-60" />
        </div>

        <h1 
          ref={titleRef} 
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 relative"
        >
          <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x pb-2">
            Digital
          </span>
          <span className="block my-2 relative">
            Realms
            <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 animate-pulse"></span>
          </span>
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient-x">
            Reimagined
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed font-light">
          We are architects of the <span className="text-purple-400 font-medium">intangible</span>, building immersive digital experiences that <span className="text-pink-400 font-medium">resonate</span> and <span className="text-cyan-400 font-medium">inspire</span>.
        </p>

        <button
          onClick={handleRipple}
          ref={ctaRef}
          className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite',
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
          
          <span className="relative z-10 flex items-center gap-3 justify-center">
            Explore Our Universe 
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </span>
          
          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute w-4 h-4 bg-white/80 rounded-full pointer-events-none"
              style={{
                left: r.x,
                top: r.y,
                transform: 'translate(-50%, -50%)',
                animation: 'ripple-animation 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ))}
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mx-auto animate-scroll"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple-animation { 
          to { 
            transform: translate(-50%, -50%) scale(15); 
            opacity: 0; 
          } 
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }

        ${particles.map((p, i) => `
          @keyframes float-${i} {
            0%, 100% { 
              transform: translate(0, 0) rotate(0deg); 
            }
            25% { 
              transform: translate(${p.speedX * 100}px, ${p.speedY * 100}px) rotate(90deg); 
            }
            50% { 
              transform: translate(${p.speedX * 150}px, ${-p.speedY * 50}px) rotate(180deg); 
            }
            75% { 
              transform: translate(${-p.speedX * 80}px, ${p.speedY * 120}px) rotate(270deg); 
            }
          }
        `).join('\n')}
      `}</style>
    </section>
  );
}