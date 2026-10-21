import React, { useEffect, useRef } from 'react';

export default function BackgroundEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Interactive mouse tracking
    const mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 55);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.35 + 0.45
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw glowing connecting lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - dist / 135)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw connecting line to mouse pointer if nearby
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.45 * (1 - dist / mouse.radius)})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // Subtle interactive attraction nudge
            const force = (mouse.radius - dist) / mouse.radius;
            particles[i].x += (dx / dist) * force * 0.45;
            particles[i].y += (dy / dist) * force * 0.45;
          }
        }
      }

      // Update & draw glowing particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 211, 252, ${p.alpha})`;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Radial ambient glow orbs with smooth floating drifting animations */}
      <div className="absolute -top-[15%] left-[10%] w-[550px] h-[550px] rounded-full bg-cyan-600/15 blur-[130px] animate-float-slow" />
      <div className="absolute top-[35%] right-[5%] w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[150px] animate-float-reverse" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[140px] animate-float-slow" style={{ animationDelay: '4.5s' }} />

      {/* Cyber Grid background pattern with gentle pulse */}
      <div 
        className="absolute inset-0 opacity-[0.16] animate-pulse-slow"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Canvas for interactive connecting particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
