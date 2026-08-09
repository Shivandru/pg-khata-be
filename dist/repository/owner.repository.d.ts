import type { ClientSession, Db } from "mongodb";
import type { CreateOwner, Owner, UpdateOwner } from "../schemas/owner.ts";
export declare class OwnerRepository {
    private readonly db;
    private readonly session?;
    constructor(db: Db, session?: ClientSession | undefined);
    private get collection();
    create(ownerData: CreateOwner & {
        userId: string;
    }): Promise<Owner>;
    getOwnerById(ownerId: string): Promise<Owner | null>;
    getOwnerByUserId(userId: string): Promise<Owner | null>;
    updateOwner(ownerId: string, updateData: UpdateOwner): Promise<Owner | null>;
    deleteOwner(ownerId: string): Promise<boolean>;
}
//# sourceMappingURL=owner.repository.d.ts.map