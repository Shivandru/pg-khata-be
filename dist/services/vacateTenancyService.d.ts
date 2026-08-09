import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
import type { Tenancy, VacateTenancy } from "../schemas/tenancy.ts";
export declare class VacateTenancyService {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    vacate(tenancyId: string, request: VacateTenancy): Promise<Tenancy>;
}
//# sourceMappingURL=vacateTenancyService.d.ts.map