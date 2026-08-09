import { ConflictException, NotFoundException, } from "../utils/exceptions/client.js";
export class VacateTenancyService {
    unitOfWork;
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    async vacate(tenancyId, request) {
        return await this.unitOfWork.execute(async (repositories) => {
            const { tenancyRepository, bedRepository, roomRepository } = repositories;
            // 1. Fetch tenancy
            const tenancy = await tenancyRepository.getTenancyById(tenancyId);
            if (!tenancy) {
                throw new NotFoundException("Tenancy not found.");
            }
            // 2. Ensure it is active
            if (!tenancy.isActive) {
                throw new ConflictException("Tenancy is already vacated.");
            }
            if (request.endDate < tenancy.startDate) {
                throw new ConflictException("End date cannot be before the tenancy start date.");
            }
            // 3. Vacate tenancy
            const updatedTenancy = await tenancyRepository.vacate(tenancyId, request.endDate);
            if (!updatedTenancy) {
                throw new NotFoundException("Unable to update tenancy.");
            }
            // 4. Free the bed
            await bedRepository.setOccupied(tenancy.bedId, tenancy.propertyId, tenancy.roomId, false);
            // 5. Decrement room occupancy
            await roomRepository.incrementOccupiedCount(tenancy.propertyId, tenancy.roomId, -1);
            return updatedTenancy;
        });
    }
}
//# sourceMappingURL=vacateTenancyService.js.map