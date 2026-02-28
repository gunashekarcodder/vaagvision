import { useState } from 'react';
import { motion } from 'framer-motion';
import { Locate } from 'lucide-react';
import CheckAreaForm from '@/components/CheckAreaForm';
import EcoRiskDashboard from '@/components/EcoRiskDashboard';
import { EcoRiskResult } from '@/types/ecoRisk';
import { getCoordinates, fetchEcoRisk } from '@/utils/ecoRiskService';
import { useToast } from '@/hooks/use-toast';

export default function EcoRiskPage() {
  const [result, setResult] = useState<EcoRiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (
    city: string | null,
    coords: { lat: number; lon: number } | null,
    greenCover: 'low' | 'medium' | 'high'
  ) => {
    setLoading(true);
    try {
      let lat: number, lon: number, name: string;
      if (coords) {
        lat = coords.lat;
        lon = coords.lon;
        name = 'Current Location';
      } else {
        const geo = await getCoordinates(city!);
        lat = geo.lat;
        lon = geo.lon;
        name = geo.name;
      }
      const data = await fetchEcoRisk(lat, lon, name, greenCover);
      setResult(data);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message || 'Could not fetch data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-6">
        {!result ? (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display text-3xl font-bold text-foreground flex items-center justify-center gap-2">
                  <Locate className="w-7 h-7 text-primary" />
                  Eco-Risk Assessment
                </h1>
                <p className="text-muted-foreground mt-2">
                  Get real-time ecological risk scores using live temperature, AQI & green cover data
                </p>
              </motion.div>
            </div>
            <CheckAreaForm onSubmit={handleSubmit} loading={loading} />
          </div>
        ) : (
          <EcoRiskDashboard result={result} onBack={() => setResult(null)} />
        )}
      </div>
    </div>
  );
}
