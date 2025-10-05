"use client";
import React, { useEffect, useRef, useState, useMemo } from 'react';

// Seeded random number generator for consistent SSR/client rendering
function seededRandom(seed) {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Starfield Background Component
function StarfieldBackground() {
  const [isClient, setIsClient] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Generate particles with seeded random for consistent rendering
  const particles = useMemo(() => {
    const random = seededRandom(12345);
    const particleCount = 60;
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: random() * 100,
      y: random() * 100,
      size: random() * 2 + 1,
      speedX: (random() - 0.5) * 0.3,
      speedY: (random() - 0.5) * 0.3,
      opacity: random() * 0.5 + 0.3,
      animDelay: random() * 5,
      animDuration: 15 + random() * 10,
    }));
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
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
      
      points.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        points.forEach((otherPoint, j) => {
          if (i === j) return;
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });

        const mouseDx = point.x - mousePos.x;
        const mouseDy = point.y - mousePos.y;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (mouseDist < 200) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * (1 - mouseDist / 200)})`;
          ctx.lineWidth = 1;
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
  }, [particles, mousePos, isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 opacity-40 pointer-events-none z-0" />
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed rounded-full bg-white pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity * 0.8,
            animation: `float-${particle.id} ${particle.animDuration}s infinite ease-in-out`,
            animationDelay: `${particle.animDelay}s`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.3)`,
            zIndex: 0,
          }}
        />
      ))}
      <style jsx>{`
        ${particles.map((p, i) => `
          @keyframes float-${i} {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(${p.speedX * 100}px, ${p.speedY * 100}px); }
            50% { transform: translate(${p.speedX * 150}px, ${-p.speedY * 50}px); }
            75% { transform: translate(${-p.speedX * 80}px, ${p.speedY * 120}px); }
          }
        `).join('\n')}
      `}</style>
    </>
  );
}


export default StarfieldBackground;