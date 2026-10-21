import React from 'react';
import { aiFeatures } from '../data/initialData';
import { 
  Orbit, 
  Wand2, 
  BrainCircuit, 
  Flame, 
  Sparkles, 
  Cpu, 
  Bot, 
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';

const ICONS = {
  Orbit,
  Wand2,
  BrainCircuit,
  Flame
};

export default function AiShowcase() {
  return (
    <section id="ai-stack" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
      {/* Background glow banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/20 p-8 sm:p-12 shadow-2xl bg-gradient-to-b from-[#0e1222]/90 to-[#090c16]/95 reveal-on-scroll">
        
        {/* Decorative corner ambient glow with floating drift */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none animate-float-reverse" style={{ animationDelay: '3s' }} />

        <div className="relative z-10">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-4 animate-float">
              <Bot className="w-3.5 h-3.5" /> Next-Gen AI Augmented Developer
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Harnessing Modern AI Dev Tools
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              I don’t just write standard code—I supercharge development velocity by orchestrating state-of-the-art AI tooling including <span className="text-cyan-400 font-bold">Google Antigravity</span>, <span className="text-purple-400 font-bold">Cursor</span>, <span className="text-emerald-400 font-bold">Codex</span>, and <span className="text-amber-400 font-bold">Replit</span>.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiFeatures.map((feat, idx) => {
              const IconComp = ICONS[feat.icon] || Sparkles;
              const delayClass = idx % 2 === 0 ? 'reveal-delay-100' : 'reveal-delay-200';

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${feat.gradient} border ${feat.border} backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/15 flex flex-col justify-between group reveal-on-scroll ${delayClass}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-slate-900/80 border border-white/10 ${feat.iconColor} shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 group-hover:border-cyan-500/40 transition-colors">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" /> Applied in Production
                    </span>
                    <span className="font-mono text-cyan-400">10x Speedup</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Workflow Banner */}
          <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Autonomous Agentic Architecture</div>
                <div className="text-[11px] text-slate-400">
                  Antigravity subagents paired with AWS microservices generate enterprise-grade pipelines with verifiable correctness.
                </div>
              </div>
            </div>
            <a
              href="#projects"
              className="shrink-0 text-xs font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 group/btn"
            >
              <span>See AI Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
