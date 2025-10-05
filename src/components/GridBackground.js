"use client";
import React from 'react';

export default function GridBackground() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}
    />
  );
}


