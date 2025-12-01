import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { DailyPerformance } from '../types';

interface CampaignOverviewChartProps {
  data: DailyPerformance[];
  title: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-sm">
        <p className="label font-bold text-white">{`${label}`}</p>
        <p className="text-blue-400">{`Reach : ${payload[0].value.toLocaleString()}`}</p>
        <p className="text-green-400">{`Engagement : ${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export const CampaignOverviewChart: React.FC<CampaignOverviewChartProps> = ({ data, title }) => {
  const reachGoal = 300000;
  const engagementGoal = 14000;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg h-96 flex flex-col">
      <h3 className="text-lg font-bold text-white mb-4 flex-shrink-0">{title}</h3>
      <div className="flex-grow w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }} tickLine={{ stroke: '#4b5563' }} angle={-15} textAnchor="end" />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} tickLine={{ stroke: '#4b5563' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{paddingTop: '20px'}}/>
            <ReferenceLine y={reachGoal} label={{ value: 'Reach Goal', position: 'insideTopLeft', fill: '#e2e8f0', fontSize: 10 }} stroke="#f43f5e" strokeDasharray="4 4" />
            <ReferenceLine y={engagementGoal} label={{ value: 'Engage Goal', position: 'insideBottomLeft', fill: '#e2e8f0', fontSize: 10 }} stroke="#fde047" strokeDasharray="4 4" />
            <Area type="monotone" dataKey="reach" name="Reach" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReach)" strokeWidth={2} />
            <Area type="monotone" dataKey="engagement" name="Engagement" stroke="#22c55e" fillOpacity={1} fill="url(#colorEngagement)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};