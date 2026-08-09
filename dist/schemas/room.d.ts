import { z } from 'zod';
export declare const roomSchema: z.ZodObject<{
    roomId: z.ZodString;
    propertyId: z.ZodString;
    roomNumber: z.ZodString;
    floor: z.ZodNumber;
    bedCount: z.ZodNumber;
    occupiedCount: z.ZodNumber;
}, z.core.$strip>;
export declare const createRoomSchema: z.ZodObject<{
    roomNumber: z.ZodString;
    floor: z.ZodNumber;
    bedCount: z.ZodNumber;
}, z.core.$strip>;
export declare const updateRoomSchema: z.ZodObject<{
    roomNumber: z.ZodOptional<z.ZodString>;
    floor: z.ZodOptional<z.ZodNumber>;
    bedCount: z.ZodOptional<z.ZodNumber>;
    occupiedCount: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const responseRoomSchema: z.ZodObject<{
    roomId: z.ZodString;
    propertyId: z.ZodString;
    roomNumber: z.ZodString;
    floor: z.ZodNumber;
    bedCount: z.ZodNumber;
    occupiedCount: z.ZodNumber;
}, z.core.$strip>;
export declare const roomSetupResponseSchema: z.ZodObject<{
    room: z.ZodObject<{
        roomId: z.ZodString;
        propertyId: z.ZodString;
        roomNumber: z.ZodString;
        floor: z.ZodNumber;
        bedCount: z.ZodNumber;
        occupiedCount: z.ZodNumber;
    }, z.core.$strip>;
    beds: z.ZodArray<z.ZodObject<{
        bedId: z.ZodString;
        roomId: z.ZodString;
        propertyId: z.ZodString;
        label: z.ZodString;
        isOccupied: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const responseRoomListSchema: z.ZodArray<z.ZodObject<{
    roomId: z.ZodString;
    propertyId: z.ZodString;
    roomNumber: z.ZodString;
    floor: z.ZodNumber;
    bedCount: z.ZodNumber;
    occupiedCount: z.ZodNumber;
}, z.core.$strip>>;
export type CreateRoom = z.infer<typeof createRoomSchema>;
export type UpdateRoom = z.infer<typeof updateRoomSchema>;
export type RoomListSchema = z.infer<typeof responseRoomListSchema>;
export type RoomSetupResponse = z.infer<typeof roomSetupResponseSchema>;
//# sourceMappingURL=room.d.ts.map