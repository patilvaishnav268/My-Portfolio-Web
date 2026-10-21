import React, { useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import BackgroundEffect from './components/BackgroundEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import AiShowcase from './components/AiShowcase';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProfileUploadModal from './components/ProfileUploadModal';
import ProjectModal from './components/ProjectModal';
import Toast from './components/Toast';

export default function App() {
  useEffect(() => {
    // Robust scroll reveal with instant viewport check and intersection observer
    const revealVisibleElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Trigger if element is within viewport or within 80px of entering
        if (rect.top <= windowHeight - 40 && rect.bottom >= 0) {
          el.classList.add('is-revealed');
        }
      });
    };

    // Initial check on load
    revealVisibleElements();

    // IntersectionObserver for smooth continuous monitoring
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px 40px 0px',
        threshold: 0.05,
      }
    );

    const observeRemaining = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    observeRemaining();

    // Scroll listener fallback for instant responsiveness
    window.addEventListener('scroll', revealVisibleElements, { passive: true });
    window.addEventListener('resize', revealVisibleElements, { passive: true });

    // Mutation observer for newly rendered/filtered elements (e.g. project tabs)
    const mutationObserver = new MutationObserver(() => {
      revealVisibleElements();
      observeRemaining();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', revealVisibleElements);
      window.removeEventListener('resize', revealVisibleElements);
    };
  }, []);

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Animated ambient particles & grid background */}
        <BackgroundEffect />

        {/* Global Floating Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow z-10">
          <Hero />
          <Skills />
          <AiShowcase />
          <Projects />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals */}
        <ProfileUploadModal />
        <ProjectModal />

        {/* Global Toast Alert */}
        <Toast />
      </div>
    </PortfolioProvider>
  );
}
