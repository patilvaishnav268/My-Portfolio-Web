import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#06080e]/95 relative z-10 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Branding & Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-xs shadow-md hover:scale-110 hover:rotate-3 transition-transform duration-300 cursor-pointer">
            VP
          </div>
          <div>
            <span className="font-bold text-white text-sm">
              {profile.name}
            </span>
            <p className="text-[11px] text-slate-400">
              Python Full-Stack & AI Solutions Architecture
            </p>
          </div>
        </div>

        {/* Tech Credits */}
        <div className="text-xs text-slate-400 text-center flex items-center gap-1.5 flex-wrap justify-center">
          <span>Engineered with</span>
          <span className="text-cyan-400 font-semibold hover:underline">Python</span>
          <span>•</span>
          <span className="text-purple-400 font-semibold hover:underline">Node.js</span>
          <span>•</span>
          <span className="text-blue-400 font-semibold hover:underline">AWS</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold hover:underline">Antigravity AI</span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-all duration-200 cursor-pointer flex items-center gap-2 text-xs font-semibold hover:scale-105 active:scale-95 group"
          title="Scroll back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform duration-200" />
        </button>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/50 text-center text-[11px] text-slate-400">
        © {new Date().getFullYear()} {profile.name}. All rights reserved. Persistent browser data enabled.
      </div>
    </footer>
  );
}
