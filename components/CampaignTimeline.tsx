import React, { useState, useEffect, useRef } from 'react';
import { TimelinePhase } from '../types';
import { CheckCircle2, CircleDashed, Loader2 } from 'lucide-react';

const statusIcons: { [key in TimelinePhase['status']]: React.ReactNode } = {
  Completed: <CheckCircle2 className="h-5 w-5 text-green-500 animate-check-pop" />,
  'In Progress': <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
  Upcoming: <CircleDashed className="h-5 w-5 text-slate-500" />,
};

const statusColors: { [key in TimelinePhase['status']]: string } = {
  Completed: 'border-green-500/50',
  'In Progress': 'border-blue-500/50',
  Upcoming: 'border-slate-700',
}

const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


export const CampaignTimeline: React.FC<{ phases: TimelinePhase[] }> = ({ phases }) => {
  const [newlyCompleted, setNewlyCompleted] = useState<Set<string>>(new Set());
  const prevPhases = usePrevious(phases);

  useEffect(() => {
    if (prevPhases) {
      const justCompleted = new Set<string>();
      phases.forEach((phase) => {
        const prev = prevPhases.find(p => p.id === phase.id);
        if (prev && prev.status !== 'Completed' && phase.status === 'Completed') {
          justCompleted.add(phase.id);
        }
      });

      if (justCompleted.size > 0) {
        setNewlyCompleted(justCompleted);
        const timer = setTimeout(() => setNewlyCompleted(new Set()), 1200); // Match animation duration
        return () => clearTimeout(timer);
      }
    }
  }, [phases, prevPhases]);

  const activePhaseIndex = phases.findIndex(p => p.status === 'In Progress');
  const lastCompletedIndex = phases.map(p => p.status).lastIndexOf('Completed');
  const progressIndex = activePhaseIndex !== -1 ? activePhaseIndex : (lastCompletedIndex !== -1 ? lastCompletedIndex : -1);
  
  const progressPercentage = progressIndex !== -1 
    ? ((progressIndex + 0.5) / phases.length) * 100 
    : 0;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">Campaign Roadmap</h3>
      <div className="relative pl-6">
        {/* Background line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-slate-700"></div>
        {/* Animated Progress Line */}
        <div 
          className="absolute left-3 top-2 w-px bg-blue-500 transition-all duration-1000 ease-in-out"
          style={{ height: `calc(${progressPercentage}%)` }}
        ></div>
        {phases.map((phase, index) => (
          <div 
            key={phase.id} 
            className={`relative mb-6 transition-transform duration-300 hover:scale-[1.02] animate-fadeInUp ${newlyCompleted.has(phase.id) ? 'animate-fadeOutIn' : ''}`}
            style={{ animationDelay: `${index * 100}ms`}}
          >
            <div className={`absolute -left-[23px] top-0.5 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border-2 ${statusColors[phase.status]} ${phase.status === 'In Progress' ? 'animate-pulseGlow' : ''}`}>
              {statusIcons[phase.status]}
            </div>
            <div className="pl-4">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{phase.duration} - <span className={`font-bold ${
                phase.status === 'Completed' ? 'text-green-400' :
                phase.status === 'In Progress' ? 'text-blue-400' : 'text-slate-500'
              }`}>{phase.status}</span></p>
              <h4 className="text-md font-bold text-slate-100 mt-0.5">{phase.title}</h4>
              <p className="text-sm text-slate-400 mt-1">{phase.description}</p>
              {phase.status === 'In Progress' && (
                <div className="mt-2 h-1 w-full bg-slate-700/50 rounded-full overflow-hidden relative">
                   <div className="h-full w-full absolute top-0 left-0 animate-indeterminate-progress"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};