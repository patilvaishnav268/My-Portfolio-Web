import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { compressImage } from '../utils/imageCompressor';
import { X, Upload, Sparkles, Image as ImageIcon, ExternalLink, Check } from 'lucide-react';
import { Github } from './Icons';

const PRESET_IMAGES = [
  { label: 'AI & Neural', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80' },
  { label: 'Cloud Architecture', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80' },
  { label: 'Full-Stack Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80' },
  { label: 'Data & Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80' }
];

export default function ProjectModal() {
  const {
    isProjectModalOpen,
    activeEditProject,
    closeProjectModal,
    addProject,
    updateProject,
    showToast
  } = usePortfolio();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Python Full-Stack',
    description: '',
    tags: '',
    demoUrl: '',
    githubUrl: '',
    imageUrl: PRESET_IMAGES[0].url,
    featured: false
  });

  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    if (activeEditProject) {
      setFormData({
        title: activeEditProject.title || '',
        category: activeEditProject.category || 'Python Full-Stack',
        description: activeEditProject.description || '',
        tags: Array.isArray(activeEditProject.tags) ? activeEditProject.tags.join(', ') : '',
        demoUrl: activeEditProject.demoUrl || '',
        githubUrl: activeEditProject.githubUrl || '',
        imageUrl: activeEditProject.imageUrl || PRESET_IMAGES[0].url,
        featured: Boolean(activeEditProject.featured)
      });
    } else {
      setFormData({
        title: '',
        category: 'Python Full-Stack',
        description: '',
        tags: 'Python, FastAPI, React, AWS',
        demoUrl: '',
        githubUrl: '',
        imageUrl: PRESET_IMAGES[0].url,
        featured: true
      });
    }
  }, [activeEditProject, isProjectModalOpen]);

  if (!isProjectModalOpen) return null;

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressed = await compressImage(file, 900, 550, 0.82);
      setFormData(prev => ({ ...prev, imageUrl: compressed }));
      showToast('Project cover image loaded successfully! 🎨');
    } catch (err) {
      showToast('Error uploading image: ' + err.message, 'error');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast('Please enter a project title.', 'error');
      return;
    }

    const tagArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const projectPayload = {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      tags: tagArray.length > 0 ? tagArray : ['Full-Stack', 'Python'],
      demoUrl: formData.demoUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
      imageUrl: formData.imageUrl || PRESET_IMAGES[0].url,
      featured: formData.featured
    };

    if (activeEditProject) {
      updateProject(activeEditProject.id, projectPayload);
    } else {
      addProject(projectPayload);
    }

    closeProjectModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl glass-panel border border-cyan-500/25 shadow-2xl p-6 sm:p-8 bg-[#0c101b]/95 text-slate-100 animate-modal-pop">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {activeEditProject ? 'Edit Project' : 'Upload New Project'}
              </h3>
              <p className="text-xs text-slate-400">
                Showcase your work with custom descriptions, tags, and cover images
              </p>
            </div>
          </div>
          <button
            onClick={closeProjectModal}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all hover:rotate-90 duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Cover Image Uploader & Preview */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Project Cover Image
            </label>
            <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 group">
              <img
                src={formData.imageUrl}
                alt="Project preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  {isCompressing ? 'Optimizing...' : 'Upload Image File'}
                </button>
                <span className="text-[11px] text-slate-300">or select a preset below</span>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              className="hidden"
            />

            {/* Presets */}
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" /> Quick Presets:
              </span>
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition cursor-pointer ${
                    formData.imageUrl === preset.url
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] px-2.5 py-1 rounded-md border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 ml-auto flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3 h-3" /> Browse File
              </button>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Title <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AI-Powered Cloud Dashboard"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category / Domain
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              >
                <option value="Python Full-Stack">Python Full-Stack</option>
                <option value="AI & Automation">AI & Automation (Antigravity/Codex)</option>
                <option value="Cloud & AWS">Cloud & AWS Computing</option>
                <option value="JavaScript & Node.js">JavaScript & Node.js</option>
                <option value="Java Applications">Java Applications</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description <span className="text-cyan-400">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="Detail what this application accomplishes, the architectural choices, and problems solved..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"
            />
          </div>

          {/* Technologies / Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tech Stack Tags <span className="text-slate-400 font-normal">(comma separated)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Python, FastAPI, Google Antigravity, AWS S3, React, Tailwind CSS"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" /> Live Demo URL
              </label>
              <input
                type="url"
                placeholder="https://yourdemo.com"
                value={formData.demoUrl}
                onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-purple-400" /> GitHub Repo URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/vaishnav/project"
                value={formData.githubUrl}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured-toggle"
              checked={formData.featured}
              onChange={e => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 h-4 w-4 bg-slate-900"
            />
            <label htmlFor="featured-toggle" className="text-xs text-slate-300 cursor-pointer">
              Mark as Featured Project (pinned badge on card)
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeProjectModal}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer transition"
            >
              <Check className="w-4 h-4" />
              {activeEditProject ? 'Save Changes' : 'Publish Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
