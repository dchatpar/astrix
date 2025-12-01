import React from 'react';
import { Budget, Channel } from '../types';
import { Mail, MessageCircle, Linkedin, Globe, Search, Megaphone, Wrench, Download } from 'lucide-react';

const channelIcons: { [key in Channel]: React.ReactNode } = {
  [Channel.Email]: <Mail className="h-5 w-5 text-blue-400" />,
  [Channel.XTwitter]: <MessageCircle className="h-5 w-5 text-sky-400" />,
  [Channel.Meta]: <Megaphone className="h-5 w-5 text-pink-500" />,
  [Channel.LinkedIn]: <Linkedin className="h-5 w-5 text-blue-600" />,
  [Channel.GoogleAds]: <Search className="h-5 w-5 text-amber-500" />,
  [Channel.Influencers]: <Globe className="h-5 w-5 text-teal-400" />,
  [Channel.Strategy]: <Wrench className="h-5 w-5 text-slate-400" />,
};

interface PerformanceTableProps {
    data: Budget[];
    onChannelSelect: (channel: Channel | null) => void;
    selectedChannel: Channel | null;
}

export const PerformanceTable: React.FC<PerformanceTableProps> = ({ data, onChannelSelect, selectedChannel }) => {

  const handleDownload = () => {
    const headers = ["Channel", "Budget (USD)", "Spent (USD)", "Impressions", "CTR (%)", "Cost Per Result (USD)"];
    const rows = data.map(item => {
        const results = item.impressions * (item.ctr / 100);
        const costPerResult = item.cost > 0 && results > 0 ? (item.cost / results).toFixed(2) : 'N/A';
        return [
            item.name,
            item.amount,
            item.cost,
            item.impressions,
            item.ctr.toFixed(2),
            costPerResult
        ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
        URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'metalpha_campaign_performance.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInteraction = (item: Budget) => {
    onChannelSelect(item.name === selectedChannel ? null : item.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: Budget) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleInteraction(item);
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl backdrop-blur-sm shadow-lg overflow-hidden">
      <div className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="text-lg font-bold text-white text-center sm:text-left">Channel Performance Details</h3>
        <button onClick={handleDownload} className="flex items-center gap-2 bg-blue-600/50 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors self-center sm:self-auto">
            <Download className="h-4 w-4" />
            Download Report
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden px-4 pb-4 space-y-4">
        {data.map(item => {
          const results = item.impressions * (item.ctr / 100);
          const costPerResult = item.cost > 0 && results > 0 ? item.cost / results : null;
          return (
            <div 
              key={item.name}
              onClick={() => handleInteraction(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              tabIndex={0}
              role="button"
              aria-pressed={selectedChannel === item.name}
              className={`p-4 rounded-lg border transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedChannel === item.name ? 'bg-blue-900/40 border-blue-700' : 'bg-slate-800/40 border-slate-700'}`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  {channelIcons[item.name]}
                  <span className="font-medium text-white">{item.name}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="text-slate-400">Budget</div>
                <div className="text-white text-right font-mono">${item.amount.toLocaleString()}</div>
                
                <div className="text-slate-400">Spent</div>
                <div className="text-white text-right font-mono">${item.cost > 0 ? item.cost.toLocaleString() : 'N/A'}</div>

                <div className="text-slate-400">Impressions</div>
                <div className="text-white text-right font-mono">{item.impressions > 0 ? item.impressions.toLocaleString() : 'N/A'}</div>

                <div className="text-slate-400">CTR (%)</div>
                <div className={`text-right font-mono font-semibold ${item.ctr >= 2.5 ? 'text-green-400' : item.ctr > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {item.ctr > 0 ? item.ctr.toFixed(2) : 'N/A'}
                </div>

                <div className="text-slate-400">Cost / Result</div>
                <div className={`text-right font-mono font-semibold ${
                  costPerResult !== null ? (costPerResult < 0.5 ? 'text-green-400' : costPerResult < 1.0 ? 'text-amber-400' : 'text-red-400') : 'text-slate-500'
                }`}>
                  {costPerResult !== null ? `$${costPerResult.toFixed(2)}` : 'N/A'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
            <tr>
              <th scope="col" className="px-6 py-3">Channel</th>
              <th scope="col" className="px-6 py-3">Budget</th>
              <th scope="col" className="px-6 py-3">Spent</th>
              <th scope="col" className="px-6 py-3">Impressions</th>
              <th scope="col" className="px-6 py-3">CTR (%)</th>
              <th scope="col" className="px-6 py-3">Cost / Result</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const results = item.impressions * (item.ctr / 100);
              const costPerResult = item.cost > 0 && results > 0 ? item.cost / results : null;

              return (
                <tr 
                  key={item.name} 
                  className={`border-b border-slate-800 transition-colors duration-200 cursor-pointer ${selectedChannel === item.name ? 'bg-blue-900/40' : 'hover:bg-slate-800/40'}`}
                  onClick={() => handleInteraction(item)}
                  onKeyDown={(e) => handleKeyDown(e, item)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedChannel === item.name}
                >
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
                  <td className={`px-6 py-4 font-semibold ${
                      costPerResult !== null
                        ? costPerResult < 0.5
                          ? 'text-green-400'
                          : costPerResult < 1.0
                          ? 'text-amber-400'
                          : 'text-red-400'
                        : 'text-slate-500'
                    }`}>
                    {costPerResult !== null ? `$${costPerResult.toFixed(2)}` : 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};