import type { BedRepository } from "../repository/bed.repository.ts";
import type { GuestRepository } from "../repository/guest.repository.ts";
import type { PropertyRepository } from "../repository/property.repository.ts";
import type { RoomRepository } from "../repository/room.repository.ts";
import type { TenancyRepository } from "../repository/tenancy.repository.ts";
import type { CreateTenancy, Tenancy } from "../schemas/tenancy.ts";
export declare class TenancyService {
    private readonly tenancyRepository;
    private readonly guestRepository;
    private readonly propertyRepository;
    private readonly roomRepository;
    private readonly bedRepository;
    constructor(tenancyRepository: TenancyRepository, guestRepository: GuestRepository, propertyRepository: PropertyRepository, roomRepository: RoomRepository, bedRepository: BedRepository);
    register(userId: string, request: CreateTenancy): Promise<Tenancy>;
}
//# sourceMappingURL=tenancy.service.d.ts.map