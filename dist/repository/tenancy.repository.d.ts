import type { Db, ClientSession } from "mongodb";
import type { CreateTenancy, Tenancy, UpdateTenancy, VacateTenancy } from "../schemas/tenancy.ts";
export declare class TenancyRepository {
    private readonly db;
    private readonly session?;
    constructor(db: Db, session?: ClientSession | undefined);
    private get collection();
    create(tenancyData: CreateTenancy & {
        guestId: string;
    }): Promise<Tenancy>;
    getTenancyById(tenancyId: string): Promise<Tenancy | null>;
    getActiveTenancyByGuestId(guestId: string): Promise<Tenancy | null>;
    updateTenancy(tenancyId: string, updateData: UpdateTenancy): Promise<Tenancy | null>;
    vacate(tenancyId: string, endDate: VacateTenancy["endDate"]): Promise<Tenancy | null>;
    deleteTenancy(tenancyId: string): Promise<boolean>;
    getActiveTenanciesByPropertyId(propertyId: string): Promise<Tenancy[]>;
}
//# sourceMappingURL=tenancy.repository.d.ts.map