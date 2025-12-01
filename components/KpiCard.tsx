
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  isPercentage?: boolean;
  isCurrency?: boolean;
  total?: number;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, icon, isPercentage = false, isCurrency = false, total }) => {
  const isPositive = change >= 0;

  const formatValue = () => {
    if (isCurrency) {
      return `$${value.toLocaleString()}`;
    }
    if (isPercentage) {
      return `${value.toFixed(1)}%`;
    }
    return value.toLocaleString();
  };
  
  const formatChange = () => {
    if (isCurrency && total) {
        return `${change.toFixed(1)}% of Budget`;
    }
    return `${Math.abs(change).toFixed(1)}%`;
  }

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/50">
      <div className="flex justify-between items-start">
        <p className="text-sm text-slate-400">{title}</p>
        {icon}
      </div>
      <div className="mt-2">
        <h2 className="text-3xl font-bold text-white">{formatValue()}</h2>
        <div className="flex items-center text-sm mt-1">
          <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span>{formatChange()}</span>
          </div>
          <span className="text-slate-500 ml-2">vs last period</span>
        </div>
      </div>
       {isCurrency && total && (
        <div className="mt-4">
            <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${(value/total)*100}%` }}></div>
            </div>
            <p className="text-xs text-slate-400 mt-1 text-right">{`$${total.toLocaleString()} Total`}</p>
        </div>
       )}
    </div>
  );
};
