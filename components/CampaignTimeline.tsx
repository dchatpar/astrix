
import React from 'react';
import { TimelinePhase } from '../types';
import { CheckCircle2, CircleDashed, Loader2 } from 'lucide-react';

const statusIcons: { [key in TimelinePhase['status']]: React.ReactNode } = {
  Completed: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  'In Progress': <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
  Upcoming: <CircleDashed className="h-5 w-5 text-slate-500" />,
};

const statusColors: { [key in TimelinePhase['status']]: string } = {
  Completed: 'border-green-500/50',
  'In Progress': 'border-blue-500/50',
  Upcoming: 'border-slate-700',
}

export const CampaignTimeline: React.FC<{ phases: TimelinePhase[] }> = ({ phases }) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">Campaign Roadmap</h3>
      <div className="relative pl-6">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-slate-700"></div>
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative mb-6">
            <div className={`absolute -left-[23px] top-0.5 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border-2 ${statusColors[phase.status]}`}>
              {statusIcons[phase.status]}
            </div>
            <div className="pl-4">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{phase.duration} - <span className={`font-bold ${
                phase.status === 'Completed' ? 'text-green-400' :
                phase.status === 'In Progress' ? 'text-blue-400' : 'text-slate-500'
              }`}>{phase.status}</span></p>
              <h4 className="text-md font-bold text-slate-100 mt-0.5">{phase.title}</h4>
              <p className="text-sm text-slate-400 mt-1">{phase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
