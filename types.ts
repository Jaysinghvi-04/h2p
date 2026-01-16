
export interface AnalyticsData {
  id: string;
  os: string;
  browser: string;
  resolution: string;
  referrer: string;
  entryTime: number;
  exitTime?: number;
  duration?: number;
  timestamp: number;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  size: 'large' | 'small' | 'tall' | 'wide';
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}
