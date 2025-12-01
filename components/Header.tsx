
import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface HeaderProps {
  clientName: string;
  campaignTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ clientName, campaignTitle }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-800">
      <div className="flex items-center gap-4">
        <img src="https://astrix.ae/logo-astrix.png" alt="Astrix.ae Logo" className="h-10" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{clientName}</h1>
          <p className="text-xs sm:text-sm text-slate-400">{campaignTitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 self-start sm:self-center">
        <Calendar className="h-4 w-4 text-slate-500" />
        <span>Oct 1, 2024 - Nov 15, 2024</span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </div>
    </header>
  );
};
