import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { compressImage } from '../utils/imageCompressor';
import { X, Upload, Camera, Trash2, Check } from 'lucide-react';

export default function ProfileUploadModal() {
  const {
    profile,
    updateProfile,
    updateProfileImage,
    removeProfileImage,
    isProfileModalOpen,
    closeProfileModal,
    showToast
  } = usePortfolio();

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: profile.name || '',
    title: profile.title || '',
    bio: profile.bio || '',
    location: profile.location || '',
    email: profile.email || '',
    github: profile.github || '',
    linkedin: profile.linkedin || ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isProfileModalOpen) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP)', 'error');
      return;
    }

    try {
      setIsProcessing(true);
      const compressedDataUrl = await compressImage(file, 500, 500, 0.85);
      setPreviewImage(compressedDataUrl);
      showToast('Image loaded and optimized! Click "Save" to apply.', 'info');
    } catch (err) {
      showToast('Error reading image: ' + err.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    if (previewImage) {
      updateProfileImage(previewImage);
    }
    updateProfile(formData);
    closeProfileModal();
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    removeProfileImage();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl my-8 rounded-2xl glass-panel border border-cyan-500/20 shadow-2xl p-6 sm:p-8 bg-[#0c101b]/95 text-slate-100 animate-modal-pop">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Customize Profile & Photo
              </h3>
              <p className="text-xs text-slate-400">Upload your profile picture and update your details</p>
            </div>
          </div>
          <button
            onClick={closeProfileModal}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all hover:rotate-90 duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar Upload Area */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="relative group shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-lg shadow-cyan-500/20 bg-slate-800 flex items-center justify-center">
              {previewImage || profile.profileImage ? (
                <img
                  src={previewImage || profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-bold text-3xl">
                  {profile.name
                    .split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
              )}
            </div>

            {/* Hover overlay upload button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-all cursor-pointer"
            >
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Browse</span>
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-semibold text-white text-sm">Profile Picture</h4>
            <p className="text-xs text-slate-400 mt-1">
              Supports PNG, JPG, WEBP. Your image will be compressed & stored securely in your browser.
            </p>

            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                {isProcessing ? 'Processing...' : 'Upload New Photo'}
              </button>

              {(previewImage || profile.profileImage) && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Reset Avatar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info Fields */}
        <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Headline Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Bio Description</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">GitHub URL</label>
              <input
                type="url"
                value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-7 pt-4 border-t border-slate-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeProfileModal}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
