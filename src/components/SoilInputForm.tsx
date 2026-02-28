import { useState } from 'react';
import { motion } from 'framer-motion';
import { SoilInput, SoilType, SurfaceCover, WaterAvailability, PollutionLevel, GreenCover } from '@/types/soil';
import { Button } from '@/components/ui/button';
import { Droplets, Leaf, Mountain, Shield, TreeDeciduous } from 'lucide-react';

interface SoilInputFormProps {
  zoneName: string;
  initialValues?: SoilInput;
  onSubmit: (input: SoilInput) => void;
  onCancel: () => void;
}

interface OptionCardProps {
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

function OptionCard({ label, value, selected, onClick, icon }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-sm font-medium ${
        selected
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border bg-card text-muted-foreground hover:border-primary/30'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function SoilInputForm({ zoneName, initialValues, onSubmit, onCancel }: SoilInputFormProps) {
  const [soilType, setSoilType] = useState<SoilType>(initialValues?.soilType ?? 'mixed');
  const [surfaceCover, setSurfaceCover] = useState<SurfaceCover>(initialValues?.surfaceCover ?? 'open');
  const [waterAvailability, setWaterAvailability] = useState<WaterAvailability>(initialValues?.waterAvailability ?? 'medium');
  const [pollutionExposure, setPollutionExposure] = useState<PollutionLevel>(initialValues?.pollutionExposure ?? 'low');
  const [previousGreenCover, setPreviousGreenCover] = useState<GreenCover>(initialValues?.previousGreenCover ?? 'no');

  const handleSubmit = () => {
    onSubmit({ soilType, surfaceCover, waterAvailability, pollutionExposure, previousGreenCover });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-display font-bold text-lg text-foreground mb-1">Soil Assessment</h3>
        <p className="text-sm text-muted-foreground">Zone: {zoneName}</p>
      </div>

      {/* Soil Type */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Mountain className="w-4 h-4 text-earth-warm" /> Soil Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['sandy', 'clay', 'mixed'] as SoilType[]).map((v) => (
            <OptionCard key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} value={v} selected={soilType === v} onClick={() => setSoilType(v)} />
          ))}
        </div>
      </div>

      {/* Surface Cover */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-earth-warm" /> Surface Cover
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { v: 'open' as SurfaceCover, l: 'Open' },
            { v: 'partial' as SurfaceCover, l: 'Partial' },
            { v: 'cemented' as SurfaceCover, l: 'Cemented' },
          ]).map((o) => (
            <OptionCard key={o.v} label={o.l} value={o.v} selected={surfaceCover === o.v} onClick={() => setSurfaceCover(o.v)} />
          ))}
        </div>
      </div>

      {/* Water */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Droplets className="w-4 h-4 text-zone-green" /> Water Availability
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['low', 'medium', 'high'] as WaterAvailability[]).map((v) => (
            <OptionCard key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} value={v} selected={waterAvailability === v} onClick={() => setWaterAvailability(v)} />
          ))}
        </div>
      </div>

      {/* Pollution */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-zone-red" /> Pollution Exposure
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['low', 'high'] as PollutionLevel[]).map((v) => (
            <OptionCard key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} value={v} selected={pollutionExposure === v} onClick={() => setPollutionExposure(v)} />
          ))}
        </div>
      </div>

      {/* Green Cover */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <TreeDeciduous className="w-4 h-4 text-zone-green" /> Previous Green Cover
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['yes', 'no'] as GreenCover[]).map((v) => (
            <OptionCard key={v} label={v === 'yes' ? 'Yes' : 'No'} value={v} selected={previousGreenCover === v} onClick={() => setPreviousGreenCover(v)} />
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button onClick={handleSubmit} className="flex-1">
          <Leaf className="w-4 h-4 mr-2" />
          Evaluate Soil
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </motion.div>
  );
}
