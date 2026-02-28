export type SoilType = 'sandy' | 'clay' | 'mixed';
export type SurfaceCover = 'open' | 'partial' | 'cemented';
export type WaterAvailability = 'low' | 'medium' | 'high';
export type PollutionLevel = 'low' | 'high';
export type GreenCover = 'yes' | 'no';
export type ZoneClassification = 'green' | 'yellow' | 'red';

export interface SoilInput {
  soilType: SoilType;
  surfaceCover: SurfaceCover;
  waterAvailability: WaterAvailability;
  pollutionExposure: PollutionLevel;
  previousGreenCover: GreenCover;
}

export interface ZoneResult {
  id: string;
  name: string;
  lat: number;
  lng: number;
  input: SoilInput;
  score: number;
  maxScore: number;
  classification: ZoneClassification;
  futureImpact: string;
  recommendations: string[];
}

export interface ZoneData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
}
