import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Camera, 
  PlusCircle, 
  Download, 
  RotateCcw, 
  Menu, 
  X, 
  Settings
} from 'lucide-react';

export default function Navbar() {
  const { 
    openProfileModal, 
    openAddProjectModal, 
    exportConfig, 
    resetToDefaults 
  } = usePortfolio();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'AI Superpowers', href: '#ai-stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-3 z-40 px-4 sm:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
      <nav className="rounded-2xl glass-panel border border-white/10 px-4 sm:px-6 py-3 shadow-2xl flex items-center justify-between backdrop-blur-xl">
        {/* Brand / Logo */}
        <a href="#about" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
            <div className="w-full h-full rounded-[10px] bg-[#090d16] flex items-center justify-center font-black text-cyan-300 text-base">
              VP
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#090d16] rounded-full animate-ping opacity-75" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#090d16] rounded-full" />
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Vaishnav Patil
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-mono">
              <span>Full-Stack</span>
              <span className="text-slate-600">•</span>
              <span>AWS Cloud</span>
              <span className="text-slate-600">•</span>
              <span className="text-purple-400">AI</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 hover:shadow-sm transition-all duration-200 active:scale-95"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Controls & Upload Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Upload Profile Picture CTA */}
          <button
            onClick={openProfileModal}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm hover:border-cyan-500/40 hover:scale-105 active:scale-95"
            title="Upload Profile Picture & Edit Info"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Profile Photo</span>
          </button>

          {/* Add Project CTA */}
          <button
            onClick={openAddProjectModal}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all duration-200 cursor-pointer hover:shadow-cyan-500/35 hover:scale-105 active:scale-95 btn-shimmer group"
          >
            <PlusCircle className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Upload Project</span>
          </button>

          {/* Settings & Backups Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 border border-slate-700/60 text-slate-400 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              title="Portfolio Options"
            >
              <Settings className="w-4 h-4" />
            </button>

            {showSettingsMenu && (
              <div 
                className="absolute right-0 mt-2 w-48 rounded-xl glass-panel border border-slate-700 bg-slate-900/95 shadow-xl py-1.5 z-50 text-xs animate-modal-pop"
                onMouseLeave={() => setShowSettingsMenu(false)}
              >
                <button
                  onClick={() => {
                    exportConfig();
                    setShowSettingsMenu(false);
                  }}
                  className="w-full px-3.5 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800/80 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Backup / Export JSON</span>
                </button>
                <button
                  onClick={() => {
                    resetToDefaults();
                    setShowSettingsMenu(false);
                  }}
                  className="w-full px-3.5 py-2 text-left text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  <span>Reset to Default Data</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={openAddProjectModal}
            className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 active:scale-95 transition-transform"
            title="Upload Project"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white active:scale-95 transition-transform"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-2 p-4 rounded-2xl glass-panel border border-slate-800 bg-[#0b0f19]/95 flex flex-col gap-3 shadow-2xl animate-modal-pop">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                openProfileModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg bg-slate-800 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 active:scale-98 transition-transform"
            >
              <Camera className="w-4 h-4" /> Change Profile Photo
            </button>
            <button
              onClick={() => {
                openAddProjectModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform btn-shimmer"
            >
              <PlusCircle className="w-4 h-4" /> Upload New Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
