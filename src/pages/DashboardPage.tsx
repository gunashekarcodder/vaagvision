import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SAMPLE_ZONES, SAMPLE_INPUTS } from '@/data/sampleZones';
import { evaluateZone } from '@/utils/soilCalculator';
import { ZoneResult } from '@/types/soil';
import { BarChart3, TreeDeciduous, AlertTriangle, Sprout } from 'lucide-react';

const ZONE_COLORS_MAP = {
  green: '#38a169',
  yellow: '#d69e2e',
  red: '#e53e3e',
};

export default function DashboardPage() {
  const results = useMemo<ZoneResult[]>(() => {
    return SAMPLE_ZONES.map((z) => {
      const input = SAMPLE_INPUTS[z.id];
      return evaluateZone(z.id, z.name, z.lat, z.lng, input);
    });
  }, []);

  const counts = useMemo(() => {
    const c = { green: 0, yellow: 0, red: 0 };
    results.forEach((r) => c[r.classification]++);
    return c;
  }, [results]);

  const pieData = [
    { name: 'Green Zones', value: counts.green, color: ZONE_COLORS_MAP.green },
    { name: 'Yellow Zones', value: counts.yellow, color: ZONE_COLORS_MAP.yellow },
    { name: 'Red Zones', value: counts.red, color: ZONE_COLORS_MAP.red },
  ];

  const barData = results.map((r) => ({
    name: r.name.split(' ').slice(0, 2).join(' '),
    score: r.score,
    fill: ZONE_COLORS_MAP[r.classification],
  }));

  const totalZones = results.length;
  const readyPercent = Math.round((counts.green / totalZones) * 100);

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2 mb-1">
            <BarChart3 className="w-6 h-6 text-primary" />
            City Soil Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            How prepared is this city for future generations?
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Zones', value: totalZones, icon: BarChart3, color: 'text-primary' },
            { label: 'Ready to Plant', value: counts.green, icon: TreeDeciduous, color: 'text-zone-green' },
            { label: 'Need Improvement', value: counts.yellow, icon: Sprout, color: 'text-zone-yellow' },
            { label: 'Needs Restoration', value: counts.red, icon: AlertTriangle, color: 'text-zone-red' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl border bg-card shadow-soft"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-xl border bg-card shadow-soft">
            <h3 className="font-display font-semibold text-foreground mb-4">Zone Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-xl border bg-card shadow-soft">
            <h3 className="font-display font-semibold text-foreground mb-4">Zone Scores</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[-4, 8]} />
                <Tooltip />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Future readiness */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-xl bg-primary text-primary-foreground text-center"
        >
          <h2 className="font-display text-3xl font-bold mb-2">
            {readyPercent}% Future-Ready
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">
            {readyPercent >= 50
              ? 'This city has good potential for sustainable urban planting. Focus on converting yellow zones.'
              : 'This city needs significant soil restoration before large-scale planting can succeed.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
