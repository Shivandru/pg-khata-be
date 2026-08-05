import type { BedRepository } from "../repository/bed.repository.ts";
import type { GuestRepository } from "../repository/guest.repository.ts";
import type { PropertyRepository } from "../repository/property.repository.ts";
import type { RoomRepository } from "../repository/room.repository.ts";
import type { TenancyRepository } from "../repository/tenancy.repository.ts";
import type { CreateTenancy, Tenancy } from "../schemas/tenancy.ts";
import {
  ConflictException,
  NotFoundException,
} from "../utils/exceptions/client.ts";

export class TenancyService {
  constructor(
    private readonly tenancyRepository: TenancyRepository,
    private readonly guestRepository: GuestRepository,
    private readonly propertyRepository: PropertyRepository,
    private readonly roomRepository: RoomRepository,
    private readonly bedRepository: BedRepository,
  ) {}

async register(
    userId: string,
    request: CreateTenancy,
): Promise<Tenancy> {
    const guest = await this.guestRepository.getGuestByUserId(userId);

    if (!guest) {
        throw new NotFoundException("Guest not found.");
    }

    const activeTenancy =
        await this.tenancyRepository.getActiveTenancyByGuestId(
            guest.guestId,
        );

    if (activeTenancy) {
        throw new ConflictException(
            "Guest already has an active tenancy.",
        );
    }

    const property = await this.propertyRepository.findById(
        request.propertyId,
    );

    if (!property) {
        throw new NotFoundException("Property not found.");
    }

    const room = await this.roomRepository.findById({
        propertyId: request.propertyId,
        roomId: request.roomId,
    });

    if (!room) {
        throw new NotFoundException("Room not found.");
    }

    const bed = await this.bedRepository.findById(
        request.bedId,
        request.propertyId,
        request.roomId,
    );

    if (!bed) {
        throw new NotFoundException("Bed not found.");
    }

    if (bed.isOccupied) {
        throw new ConflictException("Bed is already occupied.");
    }

    return await this.tenancyRepository.create({
        guestId: guest.guestId,
        ...request,
    });
}
}