import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Camera, 
  ArrowRight, 
  Download, 
  Sparkles, 
  Cloud, 
  Terminal, 
  Mail,
  PlusCircle,
  ChevronDown
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';

export default function Hero() {
  const { profile, openProfileModal, openAddProjectModal, showToast } = usePortfolio();
  
  // Rotating headline index
  const taglines = [
    "Python Full-Stack Developer",
    "AWS Cloud & Microservices Architect",
    "AI Tools Specialist (Google Antigravity, Cursor, Codex)",
    "JavaScript, Node.js & Modern Web Engineer"
  ];
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex(prev => (prev + 1) % taglines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const handleDownloadResume = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    // Create printable resume snapshot or trigger download
    window.print();
    showToast('Preparing portfolio print view / resume preview! 📄');
  };

  return (
    <section id="about" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Text, Value Prop & CTAs with choreographed entrance */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <div className="animate-hero-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/40 text-xs font-semibold text-cyan-300 mb-6 shadow-lg shadow-cyan-500/15 animate-float hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{profile.status}</span>
          </div>

          {/* Main Title */}
          <h1 className="animate-hero-2 text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Architecting Future Web & AI Systems
          </h1>

          {/* Subtitle with dynamic rotation and smooth flip animation */}
          <div className="animate-hero-3 mt-4 flex items-center gap-2 text-xl sm:text-2xl font-bold min-h-[36px] overflow-hidden">
            <span className="text-slate-400 shrink-0">Specialized in:</span>
            <span 
              key={currentTaglineIndex}
              className="text-gradient font-mono animate-tagline inline-block"
            >
              {taglines[currentTaglineIndex]}
            </span>
          </div>

          {/* Profile Name banner */}
          <p className="animate-hero-3 mt-3 text-base sm:text-lg font-semibold text-slate-200">
            Portfolio of <span className="text-cyan-300 underline decoration-cyan-500/50 underline-offset-4 hover:decoration-cyan-400 transition-all">{profile.name}</span>
          </p>

          {/* Bio Description */}
          <p className="animate-hero-4 mt-4 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            {profile.bio}
          </p>

          {/* Core Superpowers Quick Pills */}
          <div className="animate-hero-4 mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 hover:-translate-y-1 hover:scale-105 hover:border-cyan-400 transition-all duration-200 cursor-default shadow-sm shadow-cyan-500/10">
              <Terminal className="w-3.5 h-3.5" /> Python, Node & Java
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 hover:-translate-y-1 hover:scale-105 hover:border-purple-400 transition-all duration-200 cursor-default shadow-sm shadow-purple-500/10">
              <Sparkles className="w-3.5 h-3.5" /> Antigravity, Cursor & Codex
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 hover:-translate-y-1 hover:scale-105 hover:border-amber-400 transition-all duration-200 cursor-default shadow-sm shadow-amber-500/10">
              <Cloud className="w-3.5 h-3.5" /> AWS Cloud Computing
            </span>
          </div>

          {/* Action Buttons */}
          <div className="animate-hero-5 mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer btn-shimmer group"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </a>

            <button
              type="button"
              onClick={openAddProjectModal}
              className="px-5 py-3 rounded-xl glass-panel border border-cyan-500/40 hover:border-cyan-400 text-white font-bold text-sm flex items-center gap-2 transition hover:bg-slate-800/80 active:scale-95 hover:scale-105 cursor-pointer group shadow-md shadow-cyan-500/10"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
              <span>Upload Project</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadResume}
              className="px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-sm flex items-center gap-2 transition active:scale-95 hover:scale-105 cursor-pointer group shadow-sm"
              title="Print or Save Portfolio Resume"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
              <span>Resume</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="animate-hero-5 mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-4 text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Connect:</span>
            <a
              href="mailto:vaishnavpatil.dev@gmail.com"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-cyan-300 border border-slate-800 transition hover:scale-110 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-cyan-300 border border-slate-800 transition hover:scale-110 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-cyan-300 border border-slate-800 transition hover:scale-110 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Profile Card with Live Floating Tech Badges */}
        <div className="lg:col-span-5 flex justify-center animate-hero-card">
          <div className="relative w-full max-w-md animate-float">
            
            {/* Floating Tech Badges around the avatar card */}
            <div className="hidden sm:flex absolute -top-3 -left-4 z-20 px-3 py-1.5 rounded-xl glass-panel border border-cyan-400/40 bg-slate-900/90 shadow-xl shadow-cyan-500/20 text-xs font-bold text-cyan-300 items-center gap-1.5 animate-badge-float-1">
              <span>🐍</span> Python & Node
            </div>
            
            <div className="hidden sm:flex absolute top-1/4 -right-4 z-20 px-3 py-1.5 rounded-xl glass-panel border border-purple-400/40 bg-slate-900/90 shadow-xl shadow-purple-500/20 text-xs font-bold text-purple-300 items-center gap-1.5 animate-badge-float-2">
              <span>⚡</span> Fast APIs & AI
            </div>

            <div className="hidden sm:flex absolute -bottom-3 -left-3 z-20 px-3 py-1.5 rounded-xl glass-panel border border-amber-400/40 bg-slate-900/90 shadow-xl shadow-amber-500/20 text-xs font-bold text-amber-300 items-center gap-1.5 animate-badge-float-2">
              <span>☁️</span> AWS Cloud
            </div>

            <div className="hidden sm:flex absolute -bottom-3 -right-3 z-20 px-3 py-1.5 rounded-xl glass-panel border border-emerald-400/40 bg-slate-900/90 shadow-xl shadow-emerald-500/20 text-xs font-bold text-emerald-300 items-center gap-1.5 animate-badge-float-1">
              <span>🤖</span> Agentic AI
            </div>

            {/* Glowing Backdrop Frame with slow chromatic rotation */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 opacity-40 blur-xl animate-pulse-slow animate-border-rotate" />

            <div className="relative rounded-3xl glass-panel border border-slate-700/80 bg-[#0c101c]/90 p-6 sm:p-8 shadow-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
              
              {/* Card Header & Camera Upload Button */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Verified Profile
                </span>
                <button
                  onClick={openProfileModal}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </button>
              </div>

              {/* Avatar Image with Click-to-Upload */}
              <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/20 group cursor-pointer"
                onClick={openProfileModal}
                title="Click to Upload Profile Picture"
              >
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 group-hover:scale-110 transition-transform duration-300">
                      VP
                    </div>
                    <span className="mt-2 text-[11px] text-cyan-300 font-medium flex items-center gap-1">
                      <Camera className="w-3 h-3" /> Click to add photo
                    </span>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300 backdrop-blur-[2px]">
                  <Camera className="w-7 h-7 text-cyan-300 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Upload Picture</span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {profile.name}
                </h2>
                <p className="text-xs font-medium text-cyan-400 mt-1 font-mono">
                  {profile.title}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  📍 {profile.location} • <span className="text-emerald-400 font-semibold">Active & Building</span>
                </p>
              </div>

              {/* Quick Tech Badges */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <div className="text-lg font-bold text-cyan-400 font-mono">10x</div>
                  <div className="text-[10px] text-slate-400">AI Accelerated Delivery</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <div className="text-lg font-bold text-purple-400 font-mono">100%</div>
                  <div className="text-[10px] text-slate-400">Full-Stack Capability</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Gentle Scroll-Down Indicator */}
      <div className="mt-14 flex justify-center">
        <a
          href="#skills"
          aria-label="Scroll to technical skills"
          className="inline-flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors duration-200 animate-bounce-gentle group cursor-pointer"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 group-hover:text-cyan-300 transition-colors">Explore Matrix</span>
          <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
        </a>
      </div>
    </section>
  );
}
