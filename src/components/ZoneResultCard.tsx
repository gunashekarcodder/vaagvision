import { motion } from 'framer-motion';
import { ZoneResult } from '@/types/soil';
import { TreeDeciduous, Droplets, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ZoneResultCardProps {
  result: ZoneResult;
  onViewDetails?: () => void;
}

export default function ZoneResultCard({ result, onViewDetails }: ZoneResultCardProps) {
  const zoneConfig = {
    green: {
      gradient: 'bg-zone-green',
      badge: 'zone-badge-green',
      icon: TreeDeciduous,
      label: 'Green Zone — Best for Planting',
    },
    yellow: {
      gradient: 'bg-zone-yellow',
      badge: 'zone-badge-yellow',
      icon: Droplets,
      label: 'Yellow Zone — Needs Improvement',
    },
    red: {
      gradient: 'bg-zone-red',
      badge: 'zone-badge-red',
      icon: AlertTriangle,
      label: 'Red Zone — Restore First',
    },
  }[result.classification];

  const Icon = zoneConfig.icon;
  const scorePercent = Math.max(0, ((result.score + 4) / 12) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border bg-card shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className={`${zoneConfig.gradient} p-4 flex items-center gap-3`}>
        <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display font-bold text-primary-foreground">{result.name}</h3>
          <p className="text-primary-foreground/80 text-xs">{zoneConfig.label}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Score bar */}
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Soil Suitability Score</span>
            <span className="font-semibold text-foreground">{result.score}/{result.maxScore}</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scorePercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${zoneConfig.gradient}`}
            />
          </div>
        </div>

        {/* Future Impact */}
        <div className="p-3 rounded-lg bg-muted/50 border text-sm leading-relaxed">
          {result.futureImpact}
        </div>

        {/* Recommendations preview */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Recommendations
          </h4>
          <ul className="space-y-1.5">
            {result.recommendations.slice(0, 3).map((rec, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {onViewDetails && (
          <Button variant="outline" size="sm" className="w-full" onClick={onViewDetails}>
            View Full Details <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
