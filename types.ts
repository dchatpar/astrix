
export interface CampaignData {
  clientName: string;
  campaignTitle: string;
  duration: string;
  totalBudget: number;
}

export interface KpiData {
  totalReach: number;
  reachChange: number;
  engagementRate: number;
  engagementChange: number;
  budgetSpent: number;
  budgetChange: number;
  irSiteVisits: number;
  visitsChange: number;
}

export interface DailyPerformance {
  date: string;
  reach: number;
  engagement: number;
}

export enum Channel {
  Email = 'Email Engine',
  XTwitter = 'X/Twitter',
  Meta = 'Meta (FB/IG)',
  LinkedIn = 'LinkedIn',
  GoogleAds = 'Google Ads',
  Influencers = 'Influencers/KOLs',
  Strategy = 'Strategy & Creative'
}

export interface Budget {
  name: Channel;
  amount: number;
  share: number;
  scope: string;
  impressions: number;
  ctr: number;
  cost: number;
}

export interface TimelinePhase {
  id: string;
  duration: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}
