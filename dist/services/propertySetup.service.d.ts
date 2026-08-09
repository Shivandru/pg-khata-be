import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
import type { PropertySetupRequest, PropertySetupResponse } from "../schemas/propertySetup.ts";
import type { OwnerRepository } from "../repository/owner.repository.ts";
export declare class PropertySetupService {
    private readonly unitOfWork;
    private readonly ownerRepository;
    constructor(unitOfWork: UnitOfWork, ownerRepository: OwnerRepository);
    setup(userId: string, request: PropertySetupRequest): Promise<PropertySetupResponse>;
}
//# sourceMappingURL=propertySetup.service.d.ts.map