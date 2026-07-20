import { z } from 'zod';

const roomSchema = z.object({
  roomId: z.string(),
  propertyId: z.string().min(2),
  roomNumber: z.string().min(1).max(20),
  floor: z.number().int().min(0).max(50),
});

// propertyId comes from the route param (/properties/:propertyId/rooms), not the body
const createRoomSchema = roomSchema.omit({ roomId: true, propertyId: true });

const updateRoomSchema = roomSchema
  .pick({ roomNumber: true, floor: true })
  .partial();

module.exports = { roomSchema, createRoomSchema, updateRoomSchema };