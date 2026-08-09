import type { Db, ClientSession } from "mongodb";
import type { z } from "zod";
import { propertySchema, type UpdateProperty } from "../schemas/property.ts";
export type Property = z.infer<typeof propertySchema>;
export declare class PropertyRepository {
    private readonly db;
    private readonly session?;
    constructor(db: Db, session?: ClientSession | undefined);
    private get collection();
    create(propertyData: Omit<Property, "propertyId">): Promise<Property>;
    findById(propertyId: string): Promise<Property | null>;
    update(propertyId: string, updateData: UpdateProperty): Promise<Property | null>;
    findAll(): Promise<Property[]>;
    findByOwnerId(ownerId: string): Promise<Property | null>;
}
//# sourceMappingURL=property.repository.d.ts.map