import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { KpiCard } from './components/KpiCard';
import { CampaignOverviewChart } from './components/CampaignOverviewChart';
import { ChannelPerformanceChart } from './components/ChannelPerformanceChart';
import { BudgetChart } from './components/BudgetChart';
import { CampaignTimeline } from './components/CampaignTimeline';
import { PerformanceTable } from './components/PerformanceTable';
import { StockVolumeChart } from './components/StockVolumeChart';
import { StrategicMechanisms } from './components/StrategicMechanisms';
import { useMockData } from './hooks/useMockData';
import { DollarSign, Target, BarChart2, TrendingUp, XCircle, Activity } from 'lucide-react';
import { Channel, DailyPerformance, TimelinePhase } from './types';

const App: React.FC = () => {
  const { campaignData, kpiData, performanceData, timelineData: initialTimelineData, budgetData, impactData, volumeData } = useMockData();
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [timelineData, setTimelineData] = useState<TimelinePhase[]>(initialTimelineData);

  // Simulate a phase completion to demonstrate the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimelineData(currentTimeline => {
        const nextTimeline = currentTimeline.map(phase => ({ ...phase })); // Deep copy for safety
        const inProgressIndex = nextTimeline.findIndex(p => p.status === 'In Progress');

        if (inProgressIndex > -1) {
          nextTimeline[inProgressIndex].status = 'Completed';
          if (inProgressIndex + 1 < nextTimeline.length) {
            nextTimeline[inProgressIndex + 1].status = 'In Progress';
          }
        }
        return nextTimeline;
      });
    }, 5000); // Simulate after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const filteredPerformanceData = useMemo((): DailyPerformance[] => {
    if (!selectedChannel) {
      return performanceData;
    }
    const channel = budgetData.find(b => b.name === selectedChannel);
    return channel?.performance || [];
  }, [selectedChannel, performanceData, budgetData]);

  return (
    <div className="bg-[#020617] text-gray-200 min-h-screen">
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, #0f172a 0, transparent 40%),
            radial-gradient(circle at 100% 0%, #1d283a 0, transparent 42%),
            radial-gradient(circle at 50% 100%, #0b1120 0, #020617 60%)
          `
        }}
      ></div>
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
        <Header clientName={campaignData.clientName} campaignTitle={campaignData.campaignTitle} />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 my-6">
          <KpiCard title="Total Investor Reach" value={kpiData.totalReach} change={kpiData.reachChange} icon={<Target className="h-6 w-6 text-blue-400" />} extraClass="delay-100" />
          <KpiCard title="Engagement Rate" value={kpiData.engagementRate} change={kpiData.engagementChange} isPercentage={true} icon={<BarChart2 className="h-6 w-6 text-green-400" />} extraClass="delay-200" />
          <KpiCard title="Budget Spent" value={kpiData.budgetSpent} change={kpiData.budgetChange} isCurrency={true} total={campaignData.totalBudget} icon={<DollarSign className="h-6 w-6 text-amber-400" />} extraClass="delay-300" />
          <KpiCard title="IR Site Visits" value={kpiData.irSiteVisits} change={kpiData.visitsChange} icon={<TrendingUp className="h-6 w-6 text-indigo-400" />} extraClass="delay-400" />
          <KpiCard title="Stock Volume Influence" value={kpiData.stockVolumeInfluence} subValue={kpiData.avgDailyVolume} icon={<Activity className="h-6 w-6 text-violet-400" />} isPercentage extraClass="delay-500" />
        </div>

        {/* Filter Indicator */}
        {selectedChannel && (
            <div className="animate-fadeInUp delay-500 my-4 flex justify-center items-center">
                <div className="bg-slate-800 border border-slate-700 rounded-full flex items-center gap-4 pl-6 pr-4 py-2">
                    <p className="text-sm text-slate-300">
                        Showing data for: <span className="font-bold text-blue-400">{selectedChannel}</span>
                    </p>
                    <button onClick={() => setSelectedChannel(null)} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
                        <XCircle className="h-4 w-4" />
                        Clear Filter
                    </button>
                </div>
            </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 flex flex-col gap-6 animate-fadeInUp delay-200">
            <CampaignOverviewChart data={filteredPerformanceData} title={`${selectedChannel || 'Overall Campaign'} Reach & Engagement`}/>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6 animate-fadeInUp delay-300">
             <BudgetChart data={budgetData} totalBudget={campaignData.totalBudget} onChannelSelect={setSelectedChannel} />
             <StrategicMechanisms impactData={impactData} />
          </div>
           <div className="lg:col-span-3 flex flex-col gap-6 animate-fadeInUp delay-400">
             <ChannelPerformanceChart data={budgetData} />
             <StockVolumeChart volumeData={volumeData} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6 animate-fadeInUp delay-500">
            <CampaignTimeline phases={timelineData} />
          </div>
        </div>
        
        <div className="mt-6 animate-fadeInUp delay-500">
           <PerformanceTable data={budgetData} onChannelSelect={setSelectedChannel} selectedChannel={selectedChannel} />
        </div>
      </div>
    </div>
  );
};

export default App;