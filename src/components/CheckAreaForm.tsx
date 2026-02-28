import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation, Search, Loader2 } from 'lucide-react';

interface CheckAreaFormProps {
  onSubmit: (city: string | null, coords: { lat: number; lon: number } | null, greenCover: 'low' | 'medium' | 'high') => void;
  loading: boolean;
}

export default function CheckAreaForm({ onSubmit, loading }: CheckAreaFormProps) {
  const [city, setCity] = useState('');
  const [greenCover, setGreenCover] = useState<'low' | 'medium' | 'high'>('medium');
  const [geoLoading, setGeoLoading] = useState(false);

  const handleCitySubmit = () => {
    if (!city.trim()) return;
    onSubmit(city.trim(), null, greenCover);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        onSubmit(null, { lat: pos.coords.latitude, lon: pos.coords.longitude }, greenCover);
      },
      () => {
        setGeoLoading(false);
        alert('Location access denied. Please enter city manually.');
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto rounded-2xl border bg-card p-8 shadow-card space-y-5"
    >
      <h2 className="font-display font-bold text-xl text-foreground">Analyze Local Eco-Risk</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Select City</label>
        <Input
          placeholder="Enter city name (e.g., Hyderabad, London)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCitySubmit()}
        />
      </div>

      <div className="flex items-center gap-3 text-muted-foreground text-sm">
        <div className="flex-1 h-px bg-border" />
        <span>OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Button variant="outline" className="w-full" onClick={handleGeolocate} disabled={geoLoading}>
        {geoLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Navigation className="w-4 h-4 mr-2" />}
        Use Current Location
      </Button>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Local Green Cover Level</label>
        <Select value={greenCover} onValueChange={(v) => setGreenCover(v as any)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High (Parks, Forests, Abundant Trees)</SelectItem>
            <SelectItem value="medium">Medium (Moderate vegetation)</SelectItem>
            <SelectItem value="low">Low (Concrete jungle, Sparse)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full" onClick={handleCitySubmit} disabled={loading || !city.trim()}>
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
        Generate Risk Report
      </Button>
    </motion.div>
  );
}
