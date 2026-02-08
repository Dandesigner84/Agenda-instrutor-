
import { Coordinates } from '../types.ts';

/**
 * Calculates straight-line distance between two points (Haversine formula)
 */
export const calculateDistance = (p1: Coordinates, p2: Coordinates): number => {
  const R = 6371; // Earth radius in km
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLon = (p2.lng - p1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Estimates travel time based on distance (averaging city traffic)
 */
export const estimateTravelTime = (distanceKm: number): number => {
  // Average 30km/h in city including stops = 2 mins per km
  return Math.ceil(distanceKm * 2);
};

/**
 * Pricing Logic based on requirements
 */
export const calculateLessonPrice = (basePrice: number, distanceKm: number): { price: number; hasSurcharge: boolean } => {
  let finalPrice = basePrice;
  const hasSurcharge = distanceKm > 10;
  
  if (hasSurcharge) {
    finalPrice += 10;
  }
  
  return { price: finalPrice, hasSurcharge };
};
