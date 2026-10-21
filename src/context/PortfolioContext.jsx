import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProfile, initialProjects } from '../data/initialData';
import confetti from 'canvas-confetti';

const PortfolioContext = createContext();

const STORAGE_KEYS = {
  PROFILE: 'vaishnav_portfolio_profile_v1',
  PROJECTS: 'vaishnav_portfolio_projects_v1'
};

export function PortfolioProvider({ children }) {
  // Initialize profile with localStorage fallback
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : initialProfile;
    } catch (e) {
      console.error('Failed to load profile from storage:', e);
      return initialProfile;
    }
  });

  // Initialize projects with localStorage fallback
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch (e) {
      console.error('Failed to load projects from storage:', e);
      return initialProjects;
    }
  });

  // UI Modals & Toast state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [activeEditProject, setActiveEditProject] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Could not save profile:', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Could not save projects:', e);
    }
  }, [projects]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#818cf8', '#34d399', '#f472b6']
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Profile operations
  const updateProfile = (fields) => {
    setProfile(prev => ({ ...prev, ...fields }));
    showToast('Profile updated successfully! ✨');
  };

  const updateProfileImage = (dataUrl) => {
    setProfile(prev => ({ ...prev, profileImage: dataUrl }));
    triggerConfetti();
    showToast('Profile picture uploaded successfully! 📸');
  };

  const removeProfileImage = () => {
    setProfile(prev => ({ ...prev, profileImage: '' }));
    showToast('Profile picture reset to default avatar.', 'info');
  };

  // Project operations
  const addProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProject, ...prev]);
    triggerConfetti();
    showToast(`Project "${newProject.title}" added to your portfolio! 🚀`);
  };

  const updateProject = (id, updatedFields) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Project updated successfully! 💾');
  };

  const deleteProject = (id) => {
    const projectToDelete = projects.find(p => p.id === id);
    const confirmed = window.confirm(`Are you sure you want to delete "${projectToDelete?.title || 'this project'}"?`);
    if (!confirmed) return;

    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project removed.', 'info');
  };

  // Reset to initial state
  const resetToDefaults = () => {
    const confirmed = window.confirm('Reset all profile info and projects back to initial defaults? Custom changes will be cleared.');
    if (!confirmed) return;

    setProfile(initialProfile);
    setProjects(initialProjects);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    showToast('Reset to original default portfolio! 🔄', 'info');
  };

  // Export JSON backup
  const exportConfig = () => {
    const data = {
      profile,
      projects,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vaishnav_patil_portfolio_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Portfolio configuration exported! 📥');
  };

  // Import JSON backup
  const importConfig = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) setProfile(data.profile);
      if (data.projects && Array.isArray(data.projects)) setProjects(data.projects);
      showToast('Portfolio backup restored successfully! ⚡');
    } catch (e) {
      showToast('Invalid backup file. Please upload a valid portfolio JSON.', 'error');
    }
  };

  // Modal handlers
  const openAddProjectModal = () => {
    setActiveEditProject(null);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setActiveEditProject(project);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setActiveEditProject(null);
  };

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        toast,
        showToast,
        updateProfile,
        updateProfileImage,
        removeProfileImage,
        addProject,
        updateProject,
        deleteProject,
        resetToDefaults,
        exportConfig,
        importConfig,
        // Modals
        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        isProjectModalOpen,
        activeEditProject,
        openAddProjectModal,
        openEditProjectModal,
        closeProjectModal
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
