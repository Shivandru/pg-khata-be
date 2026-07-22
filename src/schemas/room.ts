import { z } from 'zod';
import { id, ID_PREFIXES } from '../utils/common.ts';

export const roomSchema = z.object({
  roomId: id(ID_PREFIXES.room),
  propertyId: id(ID_PREFIXES.property),
  roomNumber: z.string().min(1).max(20),
  floor: z.number().int().min(0).max(50),
});

// propertyId comes from the route param (/properties/:propertyId/rooms), not the body
export const createRoomSchema = roomSchema.omit({ roomId: true, propertyId: true });

export const updateRoomSchema = roomSchema
  .pick({ roomNumber: true, floor: true })
  .partial();