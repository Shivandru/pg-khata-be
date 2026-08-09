import { z } from 'zod';
import { id, ID_PREFIXES } from '../utils/common.ts';
import { responseBedListSchema } from './bed.ts';

export const roomSchema = z.object({
  roomId: id(ID_PREFIXES.room),
  propertyId: id(ID_PREFIXES.property),
  roomNumber: z.string().min(1).max(20),
  floor: z.number().int().min(0).max(50),
  bedCount: z.number().int().nonnegative(),
  occupiedCount: z.number().int().nonnegative(),
});

export const createRoomSchema = roomSchema.omit({ roomId: true, propertyId: true, occupiedCount: true });

export const updateRoomSchema = roomSchema
  .pick({ roomNumber: true, floor: true, bedCount: true, occupiedCount: true })
  .partial();

export const responseRoomSchema = roomSchema;

export const roomSetupResponseSchema = z.object({
  room: roomSchema,
  beds: responseBedListSchema
})

export const responseRoomListSchema = z.array(roomSchema);
export type CreateRoom = z.infer<typeof createRoomSchema>;
export type UpdateRoom = z.infer<typeof updateRoomSchema>;
export type RoomListSchema = z.infer<typeof responseRoomListSchema>;
export type RoomSetupResponse = z.infer<typeof roomSetupResponseSchema>;