import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
import type { CreateTenancy, Tenancy } from "../schemas/tenancy.ts";
export declare class TenancyRegistrationService {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    register(userId: string, request: CreateTenancy): Promise<Tenancy>;
    getActiveTenancy(userId: string): Promise<Tenancy | null>;
    getTenanciesByProperty(propertyId: string): Promise<Tenancy[]>;
    getGuestsByProperty(propertyId: string): Promise<{
        guestId: string;
        userId: string;
        name: string;
        email: string;
        phone: string | undefined;
        avatar: string | null | undefined;
    }[]>;
}
//# sourceMappingURL=tenancyRegistration.service.d.ts.map