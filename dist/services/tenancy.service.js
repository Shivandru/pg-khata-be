import { ConflictException, NotFoundException, } from "../utils/exceptions/client.js";
export class TenancyService {
    tenancyRepository;
    guestRepository;
    propertyRepository;
    roomRepository;
    bedRepository;
    constructor(tenancyRepository, guestRepository, propertyRepository, roomRepository, bedRepository) {
        this.tenancyRepository = tenancyRepository;
        this.guestRepository = guestRepository;
        this.propertyRepository = propertyRepository;
        this.roomRepository = roomRepository;
        this.bedRepository = bedRepository;
    }
    async register(userId, request) {
        const guest = await this.guestRepository.getGuestByUserId(userId);
        if (!guest) {
            throw new NotFoundException("Guest not found.");
        }
        const activeTenancy = await this.tenancyRepository.getActiveTenancyByGuestId(guest.guestId);
        if (activeTenancy) {
            throw new ConflictException("Guest already has an active tenancy.");
        }
        const property = await this.propertyRepository.findById(request.propertyId);
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
        const bed = await this.bedRepository.findById(request.bedId, request.propertyId, request.roomId);
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
//# sourceMappingURL=tenancy.service.js.map