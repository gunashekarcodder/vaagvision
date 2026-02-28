import { motion } from 'framer-motion';
import { EcoRiskResult } from '@/types/ecoRisk';
import RiskGauge from './RiskGauge';
import { Thermometer, Wind, TreePine, Shield, Droplets, Sun, Flower, Trees, CheckCircle, Car } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const STATUS_LABELS = {
  safe: 'SAFE / LOW RISK',
  moderate: 'MODERATE RISK',
  critical: 'CRITICAL RISK',
};

const STATUS_BADGE_CLASSES = {
  safe: 'bg-zone-green text-primary-foreground',
  moderate: 'bg-zone-yellow text-foreground',
  critical: 'bg-zone-red text-primary-foreground',
};

const ICON_MAP: Record<string, React.ReactNode> = {
  shield: <Shield className="w-5 h-5" />,
  car: <Car className="w-5 h-5" />,
  droplets: <Droplets className="w-5 h-5" />,
  sun: <Sun className="w-5 h-5" />,
  flower: <Flower className="w-5 h-5" />,
  trees: <Trees className="w-5 h-5" />,
  'check-circle': <CheckCircle className="w-5 h-5" />,
};

interface Props {
  result: EcoRiskResult;
  onBack: () => void;
}

export default function EcoRiskDashboard({ result, onBack }: Props) {
  const chartData = result.trendData.labels.map((label, i) => ({
    day: label,
    temp: Number(result.trendData.tempData[i]) || 0,
    aqi: Number(result.trendData.aqiData[i]) || 0,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">{result.locationName}</h2>
          <p className="text-sm text-muted-foreground">{new Date().toLocaleString()}</p>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${STATUS_BADGE_CLASSES[result.status]}`}>
          {STATUS_LABELS[result.status]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Risk */}
        <div className="lg:col-span-2 rounded-2xl border bg-card p-6 shadow-card space-y-4">
          <RiskGauge score={result.riskScore} status={result.status} />
          <p className="text-center text-muted-foreground max-w-md mx-auto">{result.description}</p>

          <h3 className="font-display font-semibold text-foreground pt-4">Preventive Suggestions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.suggestions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl border bg-card/50"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  {ICON_MAP[s.icon] || <Shield className="w-5 h-5" />}
                </div>
                <p className="text-sm text-foreground">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Side Metrics */}
        <div className="rounded-2xl border bg-card p-6 shadow-card space-y-5">
          <h3 className="font-display font-semibold text-foreground">Environmental Metrics</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="flex items-center gap-2 text-muted-foreground text-sm">
                <Thermometer className="w-4 h-4" /> Temperature
              </span>
              <span className="font-semibold text-foreground">{result.temp.toFixed(1)}°C</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="flex items-center gap-2 text-muted-foreground text-sm">
                <Wind className="w-4 h-4" /> AQI (Air Quality)
              </span>
              <span className="font-semibold text-foreground">{result.aqi}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="flex items-center gap-2 text-muted-foreground text-sm">
                <TreePine className="w-4 h-4" /> Green Cover
              </span>
              <span className="font-semibold text-foreground uppercase">{result.greenCover}</span>
            </div>
          </div>

          <h3 className="font-display font-semibold text-foreground pt-2">7-Day Local Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="temp" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} name="Temp °C" />
                <Line type="monotone" dataKey="aqi" stroke="hsl(var(--zone-green))" strokeWidth={2} dot={false} name="AQI" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <button onClick={onBack} className="text-sm text-primary hover:underline">← Check another area</button>
    </motion.div>
  );
}
