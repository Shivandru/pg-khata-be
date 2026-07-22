import { z } from 'zod';
import { id, ID_PREFIXES } from '../utils/common.ts';

export const bedSchema = z.object({
  bedId: id(ID_PREFIXES.bed),
  roomId: id(ID_PREFIXES.room),
  label: z.string().min(1).max(10), // e.g. "A", "B", "1"
  rentAmount: z.number().positive(),
});

export const createBedSchema = bedSchema.omit({ bedId: true, roomId: true });

export const updateBedSchema = bedSchema
  .pick({ label: true, rentAmount: true })
  .partial();