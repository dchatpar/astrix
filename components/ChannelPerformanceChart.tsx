
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { Budget } from '../types';

interface ChannelPerformanceChartProps {
  data: Budget[];
}

const colors = ["#3b82f6", "#14b8a6", "#f97316", "#8b5cf6", "#ec4899", "#ef4444", "#eab308"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-sm">
        <p className="label font-bold text-white">{`${label}`}</p>
        <p style={{ color: colors[payload[0].payload.index % colors.length] }}>
          {`CTR: ${payload[0].value.toFixed(2)}%`}
        </p>
         <p className="text-slate-400">{`Impressions: ${payload[0].payload.impressions.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export const ChannelPerformanceChart: React.FC<ChannelPerformanceChartProps> = ({ data }) => {
    const chartData = data
        .filter(d => d.ctr > 0)
        .map((d, index) => ({...d, index}));

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg h-96">
      <h3 className="text-lg font-bold text-white mb-4">Channel Performance (CTR %)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false}/>
          <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 12 }} tickLine={{ stroke: '#4b5563' }} />
          <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#9ca3af', fontSize: 12 }} tickLine={{ stroke: '#4b5563' }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}/>
          <Bar dataKey="ctr" name="Click-Through Rate">
             {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
