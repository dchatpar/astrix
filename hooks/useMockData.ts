import { CampaignData, KpiData, DailyPerformance, Budget, TimelinePhase, Channel, ImpactMechanism, VolumeDataPoint } from '../types';

// Helper to generate noisy sine wave data for more realistic mock performance
const generateChannelPerformance = (days: number, scale: number, noise: number, phase: number): { reach: number; engagement: number; }[] => {
  const data = [];
  for (let i = 1; i <= days; i++) {
    const value = (Math.sin((i / days) * Math.PI * 2 - phase) + 1) / 2; // Sine wave from 0 to 1
    const noisyValue = value + (Math.random() - 0.5) * noise;
    const reach = Math.max(0, Math.round(noisyValue * scale));
    const engagement = Math.round(reach * (0.02 + Math.random() * 0.05)); // Engagement between 2% and 7% of reach
    data.push({ reach, engagement });
  }
  return data;
};

// Helper to generate stock volume data
const generateVolumeData = (days: number): VolumeDataPoint[] => {
    const data: VolumeDataPoint[] = [];
    let baseVolume = 800000;
    for (let i = 1; i <= days; i++) {
        let volume = baseVolume + (Math.random() - 0.3) * 400000;
        let event: string | undefined = undefined;

        // Simulate spikes for events
        if (i === 4) { 
            volume *= 1.8;
            event = 'Email Campaign Launch';
        }
        if (i === 9) {
            volume *= 2.2;
            event = 'X/Twitter Spaces AMA';
        }
        if (i === 16) {
            volume *= 2.5;
            event = 'Influencer Collaboration';
        }

        data.push({ date: `Day ${i}`, volume: Math.round(volume), event });
    }
    return data;
};


export const useMockData = () => {
  const campaignData: CampaignData = {
    clientName: 'Metalpha (NASDAQ: MATH)',
    campaignTitle: '4–6 Week Global Market Awareness & Investor Visibility Campaign',
    duration: '4-6 Weeks',
    totalBudget: 35000,
  };

  const daysInCampaign = 21;
  const dates = Array.from({ length: daysInCampaign }, (_, i) => `Day ${i + 1}`);

  const rawBudgetData = [
    { name: Channel.Strategy, amount: 4000, share: 11, scope: 'Message map, creative, compliance', impressions: 0, ctr: 0, cost: 4000, scale: 0, noise: 0, phase: 0 },
    { name: Channel.Email, amount: 8000, share: 23, scope: '500k DB, sequencing, analytics', impressions: 350000, ctr: 3.2, cost: 5500, scale: 25000, noise: 0.3, phase: 0.5 },
    { name: Channel.Meta, amount: 7000, share: 20, scope: 'Awareness video, carousels, remarketing', impressions: 450000, ctr: 1.8, cost: 4000, scale: 30000, noise: 0.4, phase: 1.0 },
    { name: Channel.LinkedIn, amount: 6000, share: 17, scope: 'Sponsored posts to PMs, analysts', impressions: 120000, ctr: 0.8, cost: 3500, scale: 8000, noise: 0.2, phase: 1.5 },
    { name: Channel.XTwitter, amount: 3000, share: 9, scope: 'Threads, infographics, Spaces to 60k+ followers', impressions: 280000, ctr: 2.5, cost: 1500, scale: 20000, noise: 0.5, phase: 2.0 },
    { name: Channel.GoogleAds, amount: 4000, share: 11, scope: 'Search, Display, YouTube pre-roll', impressions: 95000, ctr: 1.2, cost: 1000, scale: 7000, noise: 0.3, phase: 2.5 },
    { name: Channel.Influencers, amount: 3000, share: 9, scope: '3–5 trusted finance/crypto voices', impressions: 150000, ctr: 3.5, cost: 0, scale: 12000, noise: 0.6, phase: 3.0 },
  ];

  const budgetData: Budget[] = rawBudgetData.map(channel => {
    const performance = generateChannelPerformance(daysInCampaign, channel.scale, channel.noise, channel.phase);
    const channelPerformance = dates.map((date, i) => ({
      date,
      reach: performance[i].reach,
      engagement: performance[i].engagement
    }));
    return { ...channel, performance: channelPerformance };
  });

  const performanceData: DailyPerformance[] = dates.map((date, i) => {
    const dailyTotal = budgetData.reduce((acc, channel) => {
      acc.reach += channel.performance[i].reach;
      acc.engagement += channel.performance[i].engagement;
      return acc;
    }, { reach: 0, engagement: 0 });

    return { date, ...dailyTotal };
  });

  const totalReach = performanceData.reduce((sum, day) => sum + day.reach, 0);
  const totalEngagement = performanceData.reduce((sum, day) => sum + day.engagement, 0);
  const budgetSpent = budgetData.reduce((sum, channel) => sum + channel.cost, 0);
  
  const volumeData = generateVolumeData(daysInCampaign);
  const avgDailyVolume = volumeData.reduce((sum, day) => sum + day.volume, 0) / daysInCampaign;

  const kpiData: KpiData = {
    totalReach,
    reachChange: 15.2,
    engagementRate: (totalEngagement / totalReach) * 100,
    engagementChange: 8.9,
    budgetSpent,
    budgetChange: (budgetSpent / campaignData.totalBudget) * 100,
    irSiteVisits: 8750,
    visitsChange: 22.1,
    stockVolumeInfluence: 25.7,
    avgDailyVolume: avgDailyVolume,
  };

  const timelineData: TimelinePhase[] = [
    { id: '0', duration: 'Days 1-3', title: 'Phase 0 – Setup, Compliance & Creative', description: 'Finalize disclaimers, develop message map, create IR assets, and install tracking.', status: 'Completed' },
    { id: '1', duration: 'Week 1', title: 'Phase 1 – Warm-Up & Launch', description: 'Initial email sends, soft-launch on social media, and test paid ad campaigns.', status: 'Completed' },
    { id: '2', duration: 'Weeks 2-4', title: 'Phase 2 – Scale & Engagement', description: 'Full-scale email deployment, weekly long-form content, influencer drops, and scale paid ads.', status: 'In Progress' },
    { id: '3', duration: 'Weeks 5-6', title: 'Phase 3 – Retarget, Consolidate & Handover', description: 'Retarget warm audiences, launch awareness hub, and compile final KPI dashboards.', status: 'Upcoming' },
  ];

  const impactData: ImpactMechanism[] = [
    { id: '1', name: 'Analyst Briefings', description: 'Briefings with small-cap and fintech analysts to expand research coverage.', value: '8 Briefings', icon: 'FileText' },
    { id: '2', name: 'Investor Watchlist Adds', description: 'Estimated new watchlist adds driven by targeted platform visibility.', value: '2,500+', icon: 'Eye' },
    { id: '3', name: 'Retail Platform Visibility', description: 'Features on Yahoo Finance, Seeking Alpha, and other retail investor hubs.', value: '3 Features', icon: 'Store' },
    { id: '4', name: 'Institutional Digital Roadshow', description: 'Virtual meetings with family offices and crypto-focused funds.', value: '12 Mtgs', icon: 'Briefcase' }
  ];


  return { campaignData, kpiData, performanceData, timelineData, budgetData, impactData, volumeData };
};