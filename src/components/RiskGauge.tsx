import { motion } from 'framer-motion';

interface RiskGaugeProps {
  score: number;
  status: 'safe' | 'moderate' | 'critical';
}

const STATUS_COLORS = {
  safe: 'hsl(var(--zone-green))',
  moderate: 'hsl(var(--zone-yellow))',
  critical: 'hsl(var(--zone-red))',
};

export default function RiskGauge({ score, status }: RiskGaugeProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  const color = STATUS_COLORS[status];

  return (
    <div className="relative w-56 h-56 mx-auto my-6">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="10" opacity={0.3} />
        <motion.circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-display font-extrabold text-foreground"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs uppercase tracking-[3px] text-muted-foreground font-semibold">Risk Score</span>
      </div>
    </div>
  );
}
