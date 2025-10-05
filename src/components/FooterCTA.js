"use client";
import React, { useState } from 'react';

export default function FooterCTA() {
  const [ripples, setRipples] = useState([]);

  const handleRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1000);
  };

  return (
    <footer className="py-32 text-center px-4">
      <h2 className="text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        Ready to Build?
      </h2>
      <p className="text-xl text-white/60 mb-12">Let's turn your vision into a digital masterpiece.</p>
      <button
        onClick={handleRipple}
        className="relative px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 group overflow-hidden"
      >
        <span className="relative z-10">Get in Touch</span>
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute w-4 h-4 bg-white rounded-full"
            style={{ left: r.x, top: r.y, transform: 'translate(-50%, -50%)', animation: 'ripple-animation 0.7s linear' }}
          />
        ))}
      </button>
      <style jsx>{`
        @keyframes ripple-animation { to { transform: translate(-50%, -50%) scale(15); opacity: 0; } }
      `}</style>
    </footer>
  );
}


