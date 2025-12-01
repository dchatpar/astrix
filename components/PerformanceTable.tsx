
import React from 'react';
import { Budget, Channel } from '../types';
import { Mail, MessageCircle, Linkedin, Globe, Search, Megaphone, Wrench } from 'lucide-react';

const channelIcons: { [key in Channel]: React.ReactNode } = {
  [Channel.Email]: <Mail className="h-5 w-5 text-blue-400" />,
  [Channel.XTwitter]: <MessageCircle className="h-5 w-5 text-sky-400" />,
  [Channel.Meta]: <Megaphone className="h-5 w-5 text-pink-500" />,
  [Channel.LinkedIn]: <Linkedin className="h-5 w-5 text-blue-600" />,
  [Channel.GoogleAds]: <Search className="h-5 w-5 text-amber-500" />,
  [Channel.Influencers]: <Globe className="h-5 w-5 text-teal-400" />,
  [Channel.Strategy]: <Wrench className="h-5 w-5 text-slate-400" />,
};

export const PerformanceTable: React.FC<{ data: Budget[] }> = ({ data }) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl backdrop-blur-sm shadow-lg overflow-hidden">
      <div className="p-5">
        <h3 className="text-lg font-bold text-white">Channel Performance Details</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
            <tr>
              <th scope="col" className="px-6 py-3">Channel</th>
              <th scope="col" className="px-6 py-3">Budget</th>
              <th scope="col" className="px-6 py-3">Spent</th>
              <th scope="col" className="px-6 py-3">Impressions</th>
              <th scope="col" className="px-6 py-3">CTR (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name} className="border-b border-slate-800 hover:bg-slate-800/40">
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {channelIcons[item.name]}
                    <span>{item.name}</span>
                  </div>
                </th>
                <td className="px-6 py-4">${item.amount.toLocaleString()}</td>
                <td className="px-6 py-4">${item.cost > 0 ? item.cost.toLocaleString() : 'N/A'}</td>
                <td className="px-6 py-4">{item.impressions > 0 ? item.impressions.toLocaleString() : 'N/A'}</td>
                <td className={`px-6 py-4 font-semibold ${item.ctr >= 2.5 ? 'text-green-400' : item.ctr > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {item.ctr > 0 ? item.ctr.toFixed(2) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
