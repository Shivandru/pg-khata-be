import { buildBeds } from "../utils/bed.js";
export class PropertySetupService {
    unitOfWork;
    ownerRepository;
    constructor(unitOfWork, ownerRepository) {
        this.unitOfWork = unitOfWork;
        this.ownerRepository = ownerRepository;
    }
    async setup(userId, request) {
        const owner = await this.ownerRepository.getOwnerByUserId(userId);
        return this.unitOfWork.execute(async (repositories) => {
            const { propertyRepository, propertyPricingRepository, roomRepository, bedRepository, } = repositories;
            const roomList = [];
            const bedList = [];
            const property = await propertyRepository.create({
                name: request.name,
                address: request.address,
                ownerId: owner?.ownerId,
            });
            const propertyPricing = await propertyPricingRepository.create(property.propertyId, request.pricing);
            for (const roomRequest of request.rooms) {
                const room = await roomRepository.create({
                    propertyId: property.propertyId,
                    roomNumber: roomRequest.roomNumber,
                    floor: roomRequest.floor,
                    bedCount: roomRequest.bedCount,
                    occupiedCount: 0,
                });
                roomList.push(room);
                const beds = buildBeds(property.propertyId, room.roomId, roomRequest.bedCount);
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
//# sourceMappingURL=propertySetup.service.js.map