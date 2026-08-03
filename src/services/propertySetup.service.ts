import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
import type {
  PropertySetupRequest,
  PropertySetupResponse,
} from "../schemas/propertySetup.ts";
import type { BedList } from "../schemas/bed.ts";
import type { RoomListSchema } from "../schemas/room.ts";
import { buildBeds } from "../utils/bed.ts";

export class PropertySetupService {
  constructor(
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async setup(
    ownerId: string,
    request: PropertySetupRequest,
  ): Promise<PropertySetupResponse> {
    return this.unitOfWork.execute(async (repositories) => {
      const {
        propertyRepository,
        propertyPricingRepository,
        roomRepository,
        bedRepository,
      } = repositories;

      const roomList: RoomListSchema = [];
      const bedList: BedList = [];

      const property = await propertyRepository.create({
        name: request.name,
        address: request.address,
        ownerId,
      });

      const propertyPricing = await propertyPricingRepository.create(
        property.propertyId,
        request.pricing,
      );

      for (const roomRequest of request.rooms) {
        const room = await roomRepository.create({
          propertyId: property.propertyId,
          roomNumber: roomRequest.roomNumber,
          floor: roomRequest.floor,
          bedCount: roomRequest.bedCount,
          occupiedCount: 0,
        });

        roomList.push(room);

        const beds = buildBeds(
          property.propertyId,
          room.roomId,
          roomRequest.bedCount,
        );

        const createdBeds = await bedRepository.createMany(beds);

        bedList.push(...createdBeds);
      }

      return {
        property,
        propertyPricing,
        rooms: roomList,
        beds: bedList,
      };
    });
  }
}