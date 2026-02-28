import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZoneResult } from '@/types/soil';
import { CITY_CENTER, DEFAULT_ZOOM } from '@/data/sampleZones';

const ZONE_COLORS: Record<string, string> = {
  green: '#38a169',
  yellow: '#d69e2e',
  red: '#e53e3e',
};

interface MapViewComponentProps {
  zones: ZoneResult[];
  onZoneClick?: (zone: ZoneResult) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function MapViewComponent({ zones, onZoneClick, center, zoom }: MapViewComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(
      [center?.lat ?? CITY_CENTER.lat, center?.lng ?? CITY_CENTER.lng],
      zoom ?? DEFAULT_ZOOM
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) map.removeLayer(layer);
    });

    zones.forEach((zone) => {
      const color = ZONE_COLORS[zone.classification];
      const circle = L.circleMarker([zone.lat, zone.lng], {
        radius: 18,
        fillColor: color,
        color: color,
        weight: 3,
        opacity: 0.9,
        fillOpacity: 0.35,
      }).addTo(map);

      const emoji = zone.classification === 'green' ? '🟢' : zone.classification === 'yellow' ? '🟡' : '🔴';
      circle.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; min-width: 200px;">
          <h3 style="font-family: 'Outfit', sans-serif; font-weight: 700; margin: 0 0 4px;">${emoji} ${zone.name}</h3>
          <p style="margin: 0 0 6px; font-size: 13px; color: #666;">Score: ${zone.score}/${zone.maxScore}</p>
          <p style="margin: 0; font-size: 12px;">${zone.futureImpact.slice(2)}</p>
        </div>
      `);

      circle.on('click', () => onZoneClick?.(zone));
    });
  }, [zones, onZoneClick]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: 400 }}
    />
  );
}
