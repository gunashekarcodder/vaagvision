import { SoilInput, ZoneClassification, ZoneResult } from '@/types/soil';

const SOIL_TYPE_SCORES: Record<string, number> = {
  mixed: 3,
  clay: 2,
  sandy: 1,
};

const WATER_SCORES: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

const GREEN_COVER_SCORES: Record<string, number> = {
  yes: 2,
  no: 0,
};

const POLLUTION_SCORES: Record<string, number> = {
  low: 0,
  high: -3,
};

const SURFACE_SCORES: Record<string, number> = {
  open: 0,
  partial: -1,
  cemented: -3,
};

export function calculateSoilScore(input: SoilInput): number {
  const score =
    SOIL_TYPE_SCORES[input.soilType] +
    WATER_SCORES[input.waterAvailability] +
    GREEN_COVER_SCORES[input.previousGreenCover] +
    POLLUTION_SCORES[input.pollutionExposure] +
    SURFACE_SCORES[input.surfaceCover];
  return score;
}

export const MAX_SCORE = 8; // 3 + 3 + 2 + 0 + 0
export const MIN_SCORE = -4; // 1 + 1 + 0 + (-3) + (-3)

export function classifyZone(score: number): ZoneClassification {
  if (score >= 5) return 'green';
  if (score >= 2) return 'yellow';
  return 'red';
}

export function getFutureImpact(classification: ZoneClassification): string {
  const impacts: Record<ZoneClassification, string> = {
    green: "🟢 This soil can support trees and food production for the next 20–30 years. Planting here will create a lasting green legacy for future generations.",
    yellow: "🟡 This soil needs improvement but has potential. With composting and water management, it can support future ecological growth within 3–5 years.",
    red: "🔴 Planting here will fail and waste resources. This soil requires restoration before it can support any ecological life for future generations.",
  };
  return impacts[classification];
}

export function getRecommendations(classification: ZoneClassification): string[] {
  const recs: Record<ZoneClassification, string[]> = {
    green: [
      "Plant native trees suited to the local climate",
      "Start urban farming with vegetables and herbs",
      "Establish community gardens for food security",
      "Create biodiversity corridors connecting green zones",
    ],
    yellow: [
      "Add organic compost to enrich soil nutrients",
      "Improve water access through rainwater harvesting",
      "Plant soil-binding ground cover first",
      "Test soil pH and amend accordingly",
      "Consider raised bed gardening as a starting point",
    ],
    red: [
      "Remove concrete and impervious surfaces where possible",
      "Implement soil restoration with bio-remediation",
      "Address pollution sources before any planting",
      "Install permeable paving to allow water infiltration",
      "Begin with hardy pioneer species only after restoration",
    ],
  };
  return recs[classification];
}

export function evaluateZone(
  id: string,
  name: string,
  lat: number,
  lng: number,
  input: SoilInput
): ZoneResult {
  const score = calculateSoilScore(input);
  const classification = classifyZone(score);
  return {
    id,
    name,
    lat,
    lng,
    input,
    score,
    maxScore: MAX_SCORE,
    classification,
    futureImpact: getFutureImpact(classification),
    recommendations: getRecommendations(classification),
  };
}
