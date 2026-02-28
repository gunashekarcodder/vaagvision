import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MapViewComponent from '@/components/MapViewComponent';
import SoilInputForm from '@/components/SoilInputForm';
import ZoneResultCard from '@/components/ZoneResultCard';
import { SAMPLE_ZONES, SAMPLE_INPUTS } from '@/data/sampleZones';
import { evaluateZone } from '@/utils/soilCalculator';
import { ZoneResult, ZoneData, SoilInput } from '@/types/soil';
import { MapPin, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MapPage() {
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const [results, setResults] = useState<Map<string, ZoneResult>>(() => {
    // Pre-evaluate sample zones
    const map = new Map<string, ZoneResult>();
    SAMPLE_ZONES.forEach((z) => {
      const input = SAMPLE_INPUTS[z.id];
      if (input) {
        map.set(z.id, evaluateZone(z.id, z.name, z.lat, z.lng, input));
      }
    });
    return map;
  });
  const [showForm, setShowForm] = useState(false);

  const allResults = useMemo(() => Array.from(results.values()), [results]);

  const handleZoneSelect = useCallback((zone: ZoneData) => {
    setSelectedZone(zone);
    setShowForm(true);
  }, []);

  const handleMapZoneClick = useCallback((zr: ZoneResult) => {
    const zone = SAMPLE_ZONES.find((z) => z.id === zr.id);
    if (zone) {
      setSelectedZone(zone);
      setShowForm(false);
    }
  }, []);

  const handleFormSubmit = useCallback((input: SoilInput) => {
    if (!selectedZone) return;
    const result = evaluateZone(selectedZone.id, selectedZone.name, selectedZone.lat, selectedZone.lng, input);
    setResults((prev) => new Map(prev).set(selectedZone.id, result));
    setShowForm(false);
  }, [selectedZone]);

  const selectedResult = selectedZone ? results.get(selectedZone.id) : undefined;

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" />
              Soil Suitability Map
            </h1>
            <p className="text-sm text-muted-foreground">Click a zone on the map or select from the list below</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden border shadow-card" style={{ minHeight: 500 }}>
            <MapViewComponent zones={allResults} onZoneClick={handleMapZoneClick} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {showForm && selectedZone ? (
                <SoilInputForm
                  key="form"
                  zoneName={selectedZone.name}
                  initialValues={SAMPLE_INPUTS[selectedZone.id]}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setShowForm(false)}
                />
              ) : selectedResult ? (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ZoneResultCard result={selectedResult} />
                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    onClick={() => setShowForm(true)}
                  >
                    Re-evaluate This Zone
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-8 rounded-xl border bg-card text-center"
                >
                  <MapPin className="w-10 h-10 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Select a zone from the map or list to begin soil assessment
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Zone list */}
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                All Zones
              </h3>
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {SAMPLE_ZONES.map((zone) => {
                  const r = results.get(zone.id);
                  const active = selectedZone?.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => handleZoneSelect(zone)}
                      className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                        active
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{zone.name}</span>
                        {r && (
                          <span className={`zone-badge-${r.classification} text-xs`}>
                            {r.classification.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{zone.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
