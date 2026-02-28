import { ZoneData, SoilInput } from '@/types/soil';

// Sample zones for Hyderabad, India
export const SAMPLE_ZONES: ZoneData[] = [
  { id: 'z1', name: 'Hussain Sagar Lake Park', lat: 17.4239, lng: 78.4738, description: 'Open park area near the lake' },
  { id: 'z2', name: 'Jubilee Hills Roadside', lat: 17.4325, lng: 78.4072, description: 'Roadside strip with partial cover' },
  { id: 'z3', name: 'Kukatpally Community Ground', lat: 17.4947, lng: 78.3996, description: 'Open community space' },
  { id: 'z4', name: 'Secunderabad Railway Area', lat: 17.4399, lng: 78.5010, description: 'Heavily cemented industrial zone' },
  { id: 'z5', name: 'Gachibowli IT Park Perimeter', lat: 17.4401, lng: 78.3489, description: 'Partially covered tech park edges' },
  { id: 'z6', name: 'Osmansagar Reserve Buffer', lat: 17.3815, lng: 78.3098, description: 'Protected buffer zone with green cover' },
  { id: 'z7', name: 'Begumpet Vacant Lot', lat: 17.4445, lng: 78.4675, description: 'Urban vacant lot near commercial area' },
  { id: 'z8', name: 'Miyapur Open Fields', lat: 17.4969, lng: 78.3534, description: 'Semi-rural open fields' },
];

export const SAMPLE_INPUTS: Record<string, SoilInput> = {
  z1: { soilType: 'mixed', surfaceCover: 'open', waterAvailability: 'high', pollutionExposure: 'low', previousGreenCover: 'yes' },
  z2: { soilType: 'clay', surfaceCover: 'partial', waterAvailability: 'medium', pollutionExposure: 'high', previousGreenCover: 'no' },
  z3: { soilType: 'mixed', surfaceCover: 'open', waterAvailability: 'medium', pollutionExposure: 'low', previousGreenCover: 'yes' },
  z4: { soilType: 'sandy', surfaceCover: 'cemented', waterAvailability: 'low', pollutionExposure: 'high', previousGreenCover: 'no' },
  z5: { soilType: 'clay', surfaceCover: 'partial', waterAvailability: 'medium', pollutionExposure: 'low', previousGreenCover: 'no' },
  z6: { soilType: 'mixed', surfaceCover: 'open', waterAvailability: 'high', pollutionExposure: 'low', previousGreenCover: 'yes' },
  z7: { soilType: 'sandy', surfaceCover: 'partial', waterAvailability: 'low', pollutionExposure: 'high', previousGreenCover: 'no' },
  z8: { soilType: 'mixed', surfaceCover: 'open', waterAvailability: 'medium', pollutionExposure: 'low', previousGreenCover: 'yes' },
};

export const CITY_CENTER = { lat: 17.4400, lng: 78.4300 };
export const DEFAULT_ZOOM = 12;
