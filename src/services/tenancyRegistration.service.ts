import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
import type { CreateTenancy, Tenancy } from "../schemas/tenancy.ts";
import {
  ConflictException,
  NotFoundException,
} from "../utils/exceptions/client.ts";

export class TenancyRegistrationService {
  constructor(private readonly unitOfWork: UnitOfWork) {}
  async register(userId: string, request: CreateTenancy): Promise<Tenancy> {
    return await this.unitOfWork.execute(async (repositories) => {
      const {
        guestRepository,
        tenancyRepository,
        propertyRepository,
        roomRepository,
        bedRepository,
      } = repositories;

      // 1. Guest must exist
      const guest = await guestRepository.getGuestByUserId(userId);

      if (!guest) {
        throw new NotFoundException("Guest profile not found.");
      }

      // 2. Guest should not already have an active tenancy
      const activeTenancy = await tenancyRepository.getActiveTenancyByGuestId(
        guest.guestId,
      );

      if (activeTenancy) {
        throw new ConflictException("Guest already has an active tenancy.");
      }

      // 3. Property must exist
      const property = await propertyRepository.findById(request.propertyId);

      if (!property) {
        throw new NotFoundException("Property not found.");
      }

      // 4. Room must exist
      const room = await roomRepository.findById({
        propertyId: request.propertyId,
        roomId: request.roomId,
      });

      if (!room) {
        throw new NotFoundException("Room not found.");
      }

      // 5. Bed must exist
      const bed = await bedRepository.findById(
        request.bedId,
        request.propertyId,
        request.roomId,
      );

      if (!bed) {
        throw new NotFoundException("Bed not found.");
      }

      // 6. Bed should not already be occupied
      if (bed.isOccupied) {
        throw new ConflictException("Bed is already occupied.");
      }

      // 7. Room should not already be full
      if (room.bedCount === room.occupiedCount) {
        throw new ConflictException("Room is already full.");
      }

      // 8. Create tenancy
      const tenancy = await tenancyRepository.create({
        guestId: guest.guestId,
        ...request,
      });

      // 9. Occupy the bed
      await bedRepository.setOccupied(
        request.bedId,
        request.propertyId,
        request.roomId,
        true,
      );

      // 10. Increment room occupancy
      await roomRepository.incrementOccupiedCount(
        request.propertyId,
        request.roomId,
        1,
      );

      return tenancy;
    });
  }

  async getActiveTenancy(userId: string): Promise<Tenancy | null> {
    return await this.unitOfWork.execute(async (repositories) => {
      const guest = await repositories.guestRepository.getGuestByUserId(userId);
      if (!guest) {
        throw new NotFoundException("Guest profile not found.");
      }
      return await repositories.tenancyRepository.getActiveTenancyByGuestId(guest.guestId);
    });
  }

  async getTenanciesByProperty(propertyId: string): Promise<Tenancy[]> {
    return await this.unitOfWork.execute(async (repositories) => {
      return await repositories.tenancyRepository.getActiveTenanciesByPropertyId(propertyId);
    });
  }

  async getGuestsByProperty(propertyId: string) {
    return await this.unitOfWork.execute(async (repositories) => {
      const tenancies = await repositories.tenancyRepository.getActiveTenanciesByPropertyId(propertyId);
      const guestIds = tenancies.map((t) => t.guestId);
      return await repositories.guestRepository.getGuestsByIds(guestIds);
    });
  }
}
