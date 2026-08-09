import type { CreateOwner, UpdateOwner } from "../schemas/owner.ts";
import type { OwnerRepository } from "../repository/owner.repository.ts";
export declare class OwnerService {
    private readonly ownerRepository;
    constructor(ownerRepository: OwnerRepository);
    create(userId: string, ownerData: CreateOwner): Promise<{
        ownerId: string;
        kycInfo: Record<string, any>;
        bankDetails: Record<string, any>;
        userId: string;
    }>;
    getById(ownerId: string): Promise<{
        ownerId: string;
        kycInfo: Record<string, any>;
        bankDetails: Record<string, any>;
        userId: string;
    }>;
    getByUserId(userId: string): Promise<{
        ownerId: string;
        kycInfo: Record<string, any>;
        bankDetails: Record<string, any>;
        userId: string;
    }>;
    update(ownerId: string, updateData: UpdateOwner): Promise<{
        ownerId: string;
        kycInfo: Record<string, any>;
        bankDetails: Record<string, any>;
        userId: string;
    }>;
    delete(ownerId: string): Promise<true>;
}
//# sourceMappingURL=owner.service.d.ts.map