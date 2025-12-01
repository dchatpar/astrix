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
  stockVolumeInfluence: number;
  avgDailyVolume: number;
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
  performance: DailyPerformance[];
}

export interface TimelinePhase {
  id: string;
  duration: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

export interface ImpactMechanism {
  id: string;
  name: string;
  description: string;
  value: string;
  icon: string;
}

export interface VolumeDataPoint {
  date: string;
  volume: number;
  event?: string;
}
