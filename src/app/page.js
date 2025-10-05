// Your main page file (e.g., app/page.js or pages/index.js)
'use client';
import React from 'react';
import Hero from '../components/Hero';
import BrandMarquee from '../components/BrandMarquee';
import Services from '../components/Services';
import SplineSection from '../components/SplineSection';
import Stats from '../components/Stats';
// import WorkShowcase from '../components/WorkShowcase'; // REMOVED
import Carousel from '../components/WorkCarousel'; // ADDED
import Testimonials from '../components/Testimonials';
import FooterCTA from '../components/FooterCTA';
import Cursor from '../components/Cursor';
import GridBackground from '../components/GridBackground';
import CustomLoader from '../components/CustomLoader';
import StarfieldBackground from '@/components/StarfieldBackground';
// Data for the new carousel component
const worksData = [
  { title: 'Project Nova', tag: 'E-Commerce', image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop' },
  { title: 'AI Synthesis', tag: 'SaaS Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
  { title: 'Fintech Guardian', tag: 'Mobile App', image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop' },
  { title: 'Community Hub', tag: 'Social Platform', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop' }
];

export default function AppPage() {
  return (
    <div className="bg-[#0a0a0a] text-white/90 overflow-x-hidden">
      <StarfieldBackground/>
      <Cursor />
      <GridBackground />
      <CustomLoader />
      <Hero />
      <BrandMarquee />
      <Services />
      <SplineSection />
      <Stats />
      {/* <WorkShowcase /> */} {/* REPLACED */}
      <Carousel  /> {/* ADDED */}
      <Testimonials />
      <FooterCTA />
    </div>
  );
}