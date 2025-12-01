
import React from 'react';
import { Header } from './components/Header';
import { KpiCard } from './components/KpiCard';
import { CampaignOverviewChart } from './components/CampaignOverviewChart';
import { ChannelPerformanceChart } from './components/ChannelPerformanceChart';
import { BudgetChart } from './components/BudgetChart';
import { CampaignTimeline } from './components/CampaignTimeline';
import { PerformanceTable } from './components/PerformanceTable';
import { useMockData } from './hooks/useMockData';
import { DollarSign, Target, BarChart2, TrendingUp, Users, Mail, MessageSquare, Linkedin, Globe, Search, Megaphone } from 'lucide-react';

const App: React.FC = () => {
  const { campaignData, kpiData, performanceData, timelineData, budgetData } = useMockData();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
          <KpiCard title="Total Investor Reach" value={kpiData.totalReach} change={kpiData.reachChange} icon={<Target className="h-6 w-6 text-blue-400" />} />
          <KpiCard title="Engagement Rate" value={kpiData.engagementRate} change={kpiData.engagementChange} isPercentage={true} icon={<BarChart2 className="h-6 w-6 text-green-400" />} />
          <KpiCard title="Budget Spent" value={kpiData.budgetSpent} change={kpiData.budgetChange} isCurrency={true} total={campaignData.totalBudget} icon={<DollarSign className="h-6 w-6 text-amber-400" />} />
          <KpiCard title="IR Site Visits" value={kpiData.irSiteVisits} change={kpiData.visitsChange} icon={<TrendingUp className="h-6 w-6 text-indigo-400" />} />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Main Charts) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <CampaignOverviewChart data={performanceData} />
            <PerformanceTable data={budgetData} />
          </div>

          {/* Right Column (Sidebar) */}
          <div className="flex flex-col gap-6">
            <BudgetChart data={budgetData} totalBudget={campaignData.totalBudget} />
            <CampaignTimeline phases={timelineData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
