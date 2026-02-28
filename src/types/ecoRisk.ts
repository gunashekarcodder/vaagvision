export interface EcoRiskState {
  locationName: string;
  lat: number | null;
  lon: number | null;
  temp: number;
  aqi: number;
  greenCover: 'low' | 'medium' | 'high';
  riskScore: number;
  loading: boolean;
  error: string | null;
}

export interface EcoRiskResult {
  riskScore: number;
  temp: number;
  aqi: number;
  greenCover: 'low' | 'medium' | 'high';
  locationName: string;
  status: 'safe' | 'moderate' | 'critical';
  description: string;
  suggestions: { icon: string; text: string }[];
  trendData: { labels: string[]; tempData: number[]; aqiData: number[] };
}
