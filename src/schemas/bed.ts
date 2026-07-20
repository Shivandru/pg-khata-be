import { z } from 'zod';

const bedSchema = z.object({
  bedId: z.string(),
  roomId: z.string().min(2),
  label: z.string().min(1).max(10), // e.g. "A", "B", "1"
  rentAmount: z.number().positive(),
});

const createBedSchema = bedSchema.omit({ bedId: true, roomId: true });

const updateBedSchema = bedSchema
  .pick({ label: true, rentAmount: true })
  .partial();

module.exports = { bedSchema, createBedSchema, updateBedSchema };