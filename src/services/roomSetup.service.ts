import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
import type { CreateRoom } from "../schemas/room.ts";
import { buildBeds } from "../utils/bed.ts";

export class RoomSetupService {
  constructor(private readonly unitOfWork: UnitOfWork) {}
  async setup(propertyId: string, request: CreateRoom) {
    return this.unitOfWork.execute(async (repositories) => {
      const room = await repositories.roomRepository.create({
        propertyId,
        roomNumber: request.roomNumber,
        floor: request.floor,
        bedCount: request.bedCount,
        occupiedCount: 0,
      });

      const beds = buildBeds(propertyId, room.roomId, request.bedCount);

      const createdBeds = await repositories.bedRepository.createMany(beds);

      return {
        room,
        beds: createdBeds,
      };
    });
  }
}
