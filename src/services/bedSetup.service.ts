import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
import type { RoomById } from "./room.service.ts";
import { NotFoundException } from "../utils/exceptions/client.ts";

export class BedSetupService {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async create({ propertyId, roomId }: RoomById) {
    return this.unitOfWork.execute(async (repositories) => {
      const { roomRepository, bedRepository } = repositories;

      const room = await roomRepository.findById({roomId, propertyId});

      if (!room) {
        throw new NotFoundException("Room not found");
      }

      const bed = await bedRepository.create({ propertyId, roomId });

      await roomRepository.updateBedCount(
        propertyId,
        roomId,
        room.bedCount + 1,
      );

      return bed;
    });
  }
}