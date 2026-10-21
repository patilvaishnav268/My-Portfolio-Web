import React, { useState } from 'react';
import { skillCategories } from '../data/initialData';
import { 
  Server, 
  Layout, 
  Bot, 
  Cloud, 
  Sparkles, 
  Zap
} from 'lucide-react';

const CATEGORY_ICONS = {
  backend: Server,
  frontend: Layout,
  'ai-tools': Bot,
  cloud: Cloud
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCategories = activeTab === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4 animate-float">
          <Sparkles className="w-3.5 h-3.5" /> Technical Expertise
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Comprehensive Tech Matrix
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          From Python backends and modern JavaScript architectures to AWS cloud infrastructure and cutting-edge AI dev workflows.
        </p>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            All Skills
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 ${
                activeTab === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat, catIdx) => {
          const IconComponent = CATEGORY_ICONS[cat.id] || Server;
          const delayClass = catIdx % 2 === 0 ? 'reveal-delay-100' : 'reveal-delay-200';

          return (
            <div
              key={cat.id}
              className={`rounded-2xl glass-panel border border-slate-800 p-6 transition-all duration-300 card-hover-effect group reveal-on-scroll ${delayClass}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} text-slate-950 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  <IconComponent className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Production Proficient</span>
                </div>
              </div>

              {/* Skill Items */}
              <div className="space-y-4">
                {cat.skills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-cyan-500/40 hover:bg-slate-900/90 hover:translate-x-1.5 transition-all duration-200 group/item"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover/item:scale-125 transition-transform duration-200" />
                        <span className="text-sm font-semibold text-slate-100 group-hover/item:text-white transition-colors">{skill.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-300">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-1000 progress-animated"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                      <span className="text-cyan-400/80 font-medium">Highlights:</span>
                      <span>{skill.highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
