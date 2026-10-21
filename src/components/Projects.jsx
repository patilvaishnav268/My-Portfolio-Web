import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  PlusCircle, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Search, 
  FolderGit2,
  Star
} from 'lucide-react';
import { Github } from './Icons';

export default function Projects() {
  const { projects, openAddProjectModal, openEditProjectModal, deleteProject } = usePortfolio();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Python Full-Stack', 'AI & Automation', 'Cloud & AWS', 'JavaScript & Node.js'];

  // Filter projects based on category and search query
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(project.tags) && project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal-on-scroll">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3 animate-float">
            <FolderGit2 className="w-3.5 h-3.5" /> Featured Work & Deployments
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Projects & Architecture
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
            Explore live production builds, Python backends, AI agentic automations, and AWS cloud infrastructures.
          </p>
        </div>

        {/* Upload Project Header CTA */}
        <button
          onClick={openAddProjectModal}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0 btn-shimmer group"
        >
          <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          <span>Upload New Project</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 reveal-on-scroll">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Interactive "Add Project" Card as first item */}
        <div
          onClick={openAddProjectModal}
          className="rounded-2xl border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-900/40 hover:bg-slate-900/80 p-8 flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-300 min-h-[380px] hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1.5 reveal-on-scroll"
        >
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 group-hover:rotate-90 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <PlusCircle className="w-8 h-8" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            Upload Another Project
          </h3>
          <p className="mt-2 text-xs text-slate-400 max-w-xs leading-relaxed">
            Click here to add your own cover image, project title, tech tags, and live deployment links.
          </p>
          <span className="mt-4 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-[11px] font-semibold group-hover:bg-cyan-500/25 transition-colors">
            + Quick Upload
          </span>
        </div>

        {/* Render Project Cards */}
        {filteredProjects.map((project, idx) => {
          const delayClass = (idx % 3 === 0) ? 'reveal-delay-100' : (idx % 3 === 1) ? 'reveal-delay-200' : 'reveal-delay-300';

          return (
            <div
              key={project.id}
              className={`rounded-2xl glass-panel border border-slate-800 overflow-hidden flex flex-col justify-between transition-all duration-300 card-hover-effect group reveal-on-scroll ${delayClass}`}
            >
              <div>
                {/* Project Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ease-out"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[10px] font-bold text-cyan-300 group-hover:border-cyan-500/40 transition-colors">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 rounded-lg bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[10px] font-bold text-amber-300 flex items-center gap-1 animate-pulse">
                        <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Edit & Delete Quick Actions on the Card */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditProjectModal(project);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:scale-110 active:scale-95 transition-all"
                      title="Edit Project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-rose-400 border border-slate-700 hover:scale-110 active:scale-95 transition-all"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {Array.isArray(project.tags) && project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Links */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition group/link"
                    >
                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition group/link"
                    >
                      <Github className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" /> Source Code
                    </a>
                  )}
                </div>

                <button
                  onClick={() => openEditProjectModal(project)}
                  className="text-[11px] text-slate-500 hover:text-cyan-400 transition hover:underline"
                >
                  Edit Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 animate-fadeIn">
          <p className="text-slate-400 text-sm">No projects found matching your search.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-3 text-xs text-cyan-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
