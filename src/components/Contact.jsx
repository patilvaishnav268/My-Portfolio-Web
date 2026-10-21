import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  MessageSquare,
  Clock,
  Loader2
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';

export default function Contact() {
  const { profile, showToast } = usePortfolio();

  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email || 'vaishnavpatil.dev@gmail.com');
    setCopied(true);
    showToast('Email copied to clipboard! 📋');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
      showToast('Message transmitted! Vaishnav will get back to you shortly. 🚀');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact Info & Value Prop */}
        <div className="lg:col-span-5 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4 animate-float">
            <MessageSquare className="w-3.5 h-3.5" /> Direct Contact
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Collaborate on Your Next Venture
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you are looking to architect scalable Python & Node microservices, deploy on AWS, or integrate next-generation AI workflows, my inbox is always open.
          </p>

          {/* Quick info cards */}
          <div className="mt-8 space-y-4">
            {/* Email Card with Copy button */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-xs text-slate-400">Direct Email</div>
                  <div className="text-sm font-semibold text-white truncate">{profile.email}</div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer shrink-0 hover:scale-105 active:scale-95"
                title="Copy Email to Clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400 animate-fadeIn" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location & Status Card */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Location</div>
                <div className="text-sm font-semibold text-white">{profile.location} • Remote & Worldwide</div>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Response Window</div>
                <div className="text-sm font-semibold text-emerald-400">Within 24 Hours Guaranteed</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition hover:scale-105 active:scale-95"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition hover:scale-105 active:scale-95"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7 reveal-on-scroll reveal-delay-200">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/20 shadow-2xl bg-[#0c101b]/95 hover:border-cyan-500/35 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-2">Send a Direct Message</h3>
            <p className="text-xs text-slate-400 mb-6">Fill in your requirements or inquiries and let's connect.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subject</label>
                <input
                  type="text"
                  placeholder="Project Consultation / Full-Stack Role / Collaboration"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project scope, timeline, or engineering opportunity..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-98 btn-shimmer group"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
                <span>{isSending ? 'Transmitting Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
