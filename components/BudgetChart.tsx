import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { Budget, Channel } from '../types';

interface BudgetChartProps {
  data: Budget[];
  totalBudget: number;
  onChannelSelect: (channel: Channel) => void;
}

const COLORS = ['#3b82f6', '#14b8a6', '#f97316', '#8b5cf6', '#ec4899', '#ef4444', '#eab308'];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#fff" className="text-xl sm:text-2xl font-bold">
        ${payload.cost.toLocaleString()}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#9ca3af" className="text-sm">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};


export const BudgetChart: React.FC<BudgetChartProps> = ({ data, totalBudget, onChannelSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieClick = (data: any) => {
    onChannelSelect(data.name);
  }

  const spent = data.reduce((acc, item) => acc + item.cost, 0);

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg">
      <h3 className="text-lg font-bold text-white mb-2">Budget Allocation & Spend</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
              onMouseEnter={onPieEnter}
              onClick={onPieClick}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="focus:outline-none focus:ring-0" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
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