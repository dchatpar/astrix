
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Budget } from '../types';

interface BudgetChartProps {
  data: Budget[];
  totalBudget: number;
}

const COLORS = ['#3b82f6', '#14b8a6', '#f97316', '#8b5cf6', '#ec4899', '#ef4444', '#eab308'];

export const BudgetChart: React.FC<BudgetChartProps> = ({ data, totalBudget }) => {
  const spent = data.reduce((acc, item) => acc + item.cost, 0);

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg">
      <h3 className="text-lg font-bold text-white mb-2">Budget Allocation</h3>
      <div className="h-56 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={60}
              fill="#8884d8"
              dataKey="amount"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-white">${spent.toLocaleString()}</span>
            <span className="text-sm text-slate-400">Spent of ${totalBudget.toLocaleString()}</span>
        </div>
      </div>
       <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs">
         {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <span className="text-slate-300">{entry.name}</span>
            <span className="ml-auto text-slate-400">{entry.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
