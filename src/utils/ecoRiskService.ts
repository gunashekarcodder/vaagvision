import { EcoRiskResult } from '@/types/ecoRisk';

export async function getCoordinates(city: string): Promise<{ lat: number; lon: number; name: string }> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) throw new Error('City not found');
  const r = data.results[0];
  return { lat: r.latitude, lon: r.longitude, name: `${r.name}, ${r.country}` };
}

export async function fetchEcoRisk(
  lat: number,
  lon: number,
  locationName: string,
  greenCover: 'low' | 'medium' | 'high'
): Promise<EcoRiskResult> {
  const [weatherRes, aqiRes] = await Promise.all([
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=temperature_2m_max&timezone=auto&forecast_days=7`),
    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi&hourly=us_aqi&timezone=auto&forecast_days=7`),
  ]);

  const weather = await weatherRes.json();
  const aqi = await aqiRes.json();

  const temp = weather.current?.temperature_2m ?? 25;
  const aqiVal = aqi.current?.us_aqi ?? 50;

  // Risk calculation
  let tempRisk = 0;
  if (temp > 25) tempRisk = Math.min(100, (temp - 25) * 6);
  else if (temp < 15) tempRisk = Math.min(100, (15 - temp) * 6);

  const aqiRisk = Math.min(100, (aqiVal / 300) * 100);
  const greenRisk = greenCover === 'low' ? 100 : greenCover === 'medium' ? 50 : 0;

  const riskScore = Math.round(tempRisk * 0.3 + aqiRisk * 0.4 + greenRisk * 0.3);

  // Status
  let status: 'safe' | 'moderate' | 'critical';
  let description: string;
  if (riskScore < 30) {
    status = 'safe';
    description = 'Your local ecosystem is in excellent health! Maintain current conservation efforts.';
  } else if (riskScore < 60) {
    status = 'moderate';
    description = 'Some ecological stress detected. Sensitive groups should be cautious of air quality.';
  } else {
    status = 'critical';
    description = 'URGENT: High ecological stress. Protective actions recommended immediately.';
  }

  // Suggestions
  const suggestions: { icon: string; text: string }[] = [];
  if (aqiVal > 100) {
    suggestions.push({ icon: 'shield', text: 'Wear an N95 mask outdoors due to high AQI.' });
    suggestions.push({ icon: 'car', text: 'Minimize vehicle idling and promote carpooling.' });
  }
  if (temp > 32) {
    suggestions.push({ icon: 'droplets', text: 'Stay hydrated and mist local plants to cool surfaces.' });
    suggestions.push({ icon: 'sun', text: 'Use heat-reflective window films or curtains.' });
  }
  if (greenCover === 'low') {
    suggestions.push({ icon: 'flower', text: 'Start a balcony or rooftop garden to combat heat.' });
    suggestions.push({ icon: 'trees', text: 'Support local community reforestation projects.' });
  }
  if (suggestions.length === 0) {
    suggestions.push({ icon: 'check-circle', text: 'Eco-stability is high. Continue monitoring weekly.' });
  }

  // Trend data from daily temps + sampled AQI
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const tempData = weather.daily?.temperature_2m_max?.slice(0, 7) ?? labels.map(() => 20 + Math.random() * 10);
  
  // Sample hourly AQI to daily averages
  const hourlyAqi: number[] = aqi.hourly?.us_aqi ?? [];
  const aqiData = labels.map((_, i) => {
    const daySlice = hourlyAqi.slice(i * 24, (i + 1) * 24).filter(Boolean);
    return daySlice.length > 0 ? Math.round(daySlice.reduce((a, b) => a + b, 0) / daySlice.length) : 50 + Math.random() * 50;
  });

  return { riskScore, temp, aqi: aqiVal, greenCover, locationName, status, description, suggestions, trendData: { labels, tempData, aqiData } };
}
