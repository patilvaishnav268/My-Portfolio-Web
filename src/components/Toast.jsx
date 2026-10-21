import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = usePortfolio();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 animate-fadeIn" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 animate-fadeIn" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0 animate-fadeIn" />
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-emerald-950/90 shadow-emerald-500/10',
    error: 'border-rose-500/30 bg-rose-950/90 shadow-rose-500/10',
    info: 'border-cyan-500/30 bg-slate-900/95 shadow-cyan-500/10'
  };

  return (
    <aside
      aria-label="Notification alert"
      className="fixed bottom-6 right-6 z-50 animate-toast-slide"
    >
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl backdrop-blur-xl text-slate-100 transition-all ${
          borderColors[toast.type] || borderColors.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </aside>
  );
}
