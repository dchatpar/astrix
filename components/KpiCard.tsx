import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: number;
  change?: number;
  icon: React.ReactNode;
  isPercentage?: boolean;
  isCurrency?: boolean;
  total?: number;
  extraClass?: string;
  subValue?: number | string;
}

const useCountUp = (endValue: number, duration: number = 1500) => {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number>();
    
    useEffect(() => {
        let start = 0;
        const end = endValue;
        if (start === end) {
            setCount(end);
            return;
        };

        let startTime: number | null = null;
        
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            // Ease out cubic
            const easedValue = 1 - Math.pow(1 - percentage, 3);

            setCount(easedValue * (end - start) + start);
            
            if (progress < duration) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        
        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
        
    }, [endValue, duration]);
    
    return count;
};


export const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, icon, isPercentage = false, isCurrency = false, total, extraClass = '', subValue }) => {
  const isPositive = change === undefined || change >= 0;
  const animatedValue = useCountUp(value);

  const formatValue = (val: number) => {
    if (isCurrency) {
      return `$${Math.round(val).toLocaleString()}`;
    }
    if (isPercentage) {
      // Special handling for the stock volume card which is a % but doesn't have a change prop
      if (title === "Stock Volume Influence") return `+${val.toFixed(1)}%`;
      return `${val.toFixed(1)}%`;
    }
    return Math.round(val).toLocaleString();
  };
  
  const formatChange = () => {
    if (isCurrency && total) {
        return `${(change ?? 0).toFixed(1)}% of Budget`;
    }
    return `${Math.abs(change ?? 0).toFixed(1)}%`;
  }

  const formatSubValue = (val: number | string) => {
    if (typeof val === 'number') {
        if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M`;
        if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
        return val.toLocaleString();
    }
    return val;
  }

  return (
    <div className={`bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/50 animate-fadeInUp ${extraClass}`}>
      <div className="flex justify-between items-start">
        <p className="text-sm text-slate-400">{title}</p>
        {icon}
      </div>
      <div className="mt-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{formatValue(animatedValue)}</h2>
        <div className="flex items-center text-sm mt-1 flex-wrap">
           {change !== undefined ? (
             <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
               {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
               <span>{formatChange()}</span>
             </div>
           ) : (
            // For stock volume card, we use a static text
             title === "Stock Volume Influence" && <div className="text-green-400">vs. pre-campaign</div>
           )}

          {subValue !== undefined && (
            <div className="text-slate-400">
                {change !== undefined && <span className="text-slate-500 mx-2">|</span>}
                Avg. Daily Volume: <span className="font-semibold text-slate-300">{formatSubValue(subValue)}</span>
            </div>
           )}

           {change !== undefined && subValue === undefined && <span className="text-slate-500 ml-2">vs last period</span>}
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