
import { CampaignData, KpiData, DailyPerformance, Budget, TimelinePhase, Channel } from '../types';

export const useMockData = () => {
  const campaignData: CampaignData = {
    clientName: 'Metalpha (NASDAQ: MATH)',
    campaignTitle: '4–6 Week Global Market Awareness & Investor Visibility Campaign',
    duration: '4-6 Weeks',
    totalBudget: 35000,
  };

  const budgetSpent = 19500;
  const totalReach = 325480;
  const engagement = totalReach * 0.045;
  const irSiteVisits = 8750;

  const kpiData: KpiData = {
    totalReach,
    reachChange: 15.2,
    engagementRate: 4.5,
    engagementChange: 8.9,
    budgetSpent,
    budgetChange: (budgetSpent / campaignData.totalBudget) * 100,
    irSiteVisits,
    visitsChange: 22.1,
  };

  const performanceData: DailyPerformance[] = [
    { date: 'Day 1', reach: 5000, engagement: 200 },
    { date: 'Day 3', reach: 15000, engagement: 650 },
    { date: 'Day 5', reach: 30000, engagement: 1300 },
    { date: 'Day 7', reach: 55000, engagement: 2500 },
    { date: 'Day 9', reach: 80000, engagement: 3600 },
    { date: 'Day 11', reach: 110000, engagement: 5000 },
    { date: 'Day 13', reach: 145000, engagement: 6500 },
    { date: 'Day 15', reach: 180000, engagement: 8100 },
    { date: 'Day 17', reach: 220000, engagement: 9900 },
    { date: 'Day 19', reach: 260000, engagement: 11700 },
    { date: 'Day 21', reach: 325480, engagement: 14646 },
  ];

  const budgetData: Budget[] = [
     { name: Channel.Strategy, amount: 4000, share: 11, scope: 'Message map, creative, compliance', impressions: 0, ctr: 0, cost: 4000 },
    { name: Channel.Email, amount: 8000, share: 23, scope: '500k DB, sequencing, analytics', impressions: 350000, ctr: 3.2, cost: 5500 },
    { name: Channel.Meta, amount: 7000, share: 20, scope: 'Awareness video, carousels, remarketing', impressions: 450000, ctr: 1.8, cost: 4000 },
    { name: Channel.LinkedIn, amount: 6000, share: 17, scope: 'Sponsored posts to PMs, analysts', impressions: 120000, ctr: 0.8, cost: 3500 },
    { name: Channel.XTwitter, amount: 3000, share: 9, scope: 'Threads, infographics, Spaces to 60k+ followers', impressions: 280000, ctr: 2.5, cost: 1500 },
    { name: Channel.GoogleAds, amount: 4000, share: 11, scope: 'Search, Display, YouTube pre-roll', impressions: 95000, ctr: 1.2, cost: 1000 },
    { name: Channel.Influencers, amount: 3000, share: 9, scope: '3–5 trusted finance/crypto voices', impressions: 150000, ctr: 3.5, cost: 0 }, // Cost might be fixed fee
  ];
  
  const timelineData: TimelinePhase[] = [
    {
      id: '0',
      duration: 'Days 1-3',
      title: 'Phase 0 – Setup, Compliance & Creative',
      description: 'Finalize disclaimers, develop message map, create IR assets, and install tracking.',
      status: 'Completed',
    },
    {
      id: '1',
      duration: 'Week 1',
      title: 'Phase 1 – Warm-Up & Launch',
      description: 'Initial email sends, soft-launch on social media, and test paid ad campaigns.',
      status: 'Completed',
    },
    {
      id: '2',
      duration: 'Weeks 2-4',
      title: 'Phase 2 – Scale & Engagement',
      description: 'Full-scale email deployment, weekly long-form content, influencer drops, and scale paid ads.',
      status: 'In Progress',
    },
    {
      id: '3',
      duration: 'Weeks 5-6',
      title: 'Phase 3 – Retarget, Consolidate & Handover',
      description: 'Retarget warm audiences, launch awareness hub, and compile final KPI dashboards.',
      status: 'Upcoming',
    },
  ];

  return { campaignData, kpiData, performanceData, timelineData, budgetData };
};
