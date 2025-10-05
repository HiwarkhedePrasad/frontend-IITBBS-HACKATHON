"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Chart.js Imports ---
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement, // Needed for Doughnut chart
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// --- GSAP and Chart.js Registration ---
gsap.registerPlugin(useGSAP, ScrollTrigger);
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler
);

// #########################
// ### COMPONENT START ###
// #########################

export default function AnalyticsDashboard() {
  const containerRef = useRef(null);
  const titleRef = useRef(null); // <-- FIX IS HERE
  const lineChartInstanceRef = useRef(null);

  // --- Made-up Data for the Dashboard ---
  const kpiData = [
    { label: 'Monthly Active Users', value: '12.8k', change: '+15.2%', isPositive: true },
    { label: 'Conversion Rate', value: '4.82%', change: '+1.1%', isPositive: true },
    { label: 'Avg. Session Duration', value: '3m 45s', change: '-3.4%', isPositive: false },
    { label: 'Bounce Rate', value: '28.1%', change: '-7.9%', isPositive: false },
  ];

  const activityFeed = [
    { event: 'Project "Nebula" launched', time: '2h ago', icon: '🚀' },
    { event: 'New server deployed in EU region', time: '8h ago', icon: '☁️' },
    { event: 'Team reached 500 commits', time: '1d ago', icon: '🎉' },
    { event: 'AI model accuracy increased by 3%', time: '2d ago', icon: '🧠' },
  ];

  const titleChars = "Analytics & Performance Dashboard".split('');

  // --- Line Chart Configuration ---
  const lineChartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'top', labels: { color: 'rgba(255,255,255,0.7)' } } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
      x: { grid: { display: false }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } }
    },
    elements: { line: { tension: 0.4 } },
    interaction: { intersect: false, mode: 'index' },
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Client Growth', data: [32, 45, 68, 82, 110, 145],
        borderColor: '#00FFFF', pointBackgroundColor: '#00FFFF',
        fill: true, backgroundColor: 'transparent'
      },
      {
        label: 'Revenue Growth (in K)', data: [50, 62, 85, 105, 130, 180],
        borderColor: '#FF00FF', pointBackgroundColor: '#FF00FF',
        fill: false,
      }
    ]
  };
  
  // --- Doughnut Chart Configuration ---
  const doughnutOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: 'rgba(255,255,255,0.7)', padding: 15 } } },
    cutout: '70%',
  };

  const doughnutData = {
    labels: ['Web Dev', 'AI/ML Projects', 'Mobile Apps', 'Cloud Infra'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: ['#00FFFF', '#FF00FF', '#8A2BE2', '#4B0082'],
      borderColor: 'rgba(10,10,10,0.5)',
      borderWidth: 2,
      hoverOffset: 10,
    }]
  };

  // --- Dynamic Gradient for Line Chart ---
  useEffect(() => {
    if (lineChartInstanceRef.current) {
      const chart = lineChartInstanceRef.current;
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  // --- GSAP Animation Timeline ---
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: 'top 60%', toggleActions: 'play none none none' }
    });

    tl.from(titleRef.current.children, {
      y: 50, autoAlpha: 0, skewX: 30, duration: 0.7, stagger: 0.02, ease: 'power3.out'
    })
    .from('.kpi-card', {
      autoAlpha: 0, y: 30, duration: 0.5, stagger: 0.1, ease: 'power2.out'
    }, "-=0.5")
    .from('.main-chart-container', {
      autoAlpha: 0, scale: 0.98, y: 30, duration: 0.7, ease: 'power3.out'
    }, "-=0.5")
    .from('.secondary-column > *', {
      autoAlpha: 0, x: 30, duration: 0.6, stagger: 0.15, ease: 'power2.out'
    }, "-=0.6");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 z-10 relative">
        <h2 ref={titleRef} className="text-center text-4xl sm:text-5xl font-black mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" aria-label="Analytics & Performance Dashboard">
          {titleChars.map((char, i) => (
            <span key={i} className="inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>{char}</span>
          ))}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kpiData.map((kpi) => (
                <div key={kpi.label} className="kpi-card bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg backdrop-blur-sm">
                  <p className="text-sm text-white/60 mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                  <p className={`text-xs font-semibold ${kpi.isPositive ? 'text-green-400' : 'text-red-400'}`}>{kpi.change}</p>
                </div>
              ))}
            </div>

            <div className="main-chart-container bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Quarterly Growth Metrics</h3>
              <div className="h-[350px] sm:h-[450px]">
                <Line ref={lineChartInstanceRef} options={lineChartOptions} data={lineChartData} />
              </div>
            </div>
          </div>

          <div className="secondary-column lg:col-span-1 flex flex-col gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Service Distribution</h3>
              <div className="h-[280px] w-full flex justify-center items-center">
                <Doughnut options={doughnutOptions} data={doughnutData} />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Recent Updates</h3>
              <ul className="space-y-4">
                {activityFeed.map((item) => (
                  <li key={item.event} className="flex items-center gap-4">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-white/90 text-sm">{item.event}</p>
                      <p className="text-xs text-white/50">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}