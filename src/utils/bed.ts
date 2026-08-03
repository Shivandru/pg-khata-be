import type { Bed } from "../repository/bed.repository.ts";

export function buildBeds(
  propertyId: string,
  roomId: string,
  bedCount: number,
): Omit<Bed, "bedId">[] {
  return Array.from({ length: bedCount }, (_, index) => ({
    propertyId,
    roomId,
    label: String.fromCharCode(65 + index), // A, B, C, D...
    isOccupied: false,
  }));
}