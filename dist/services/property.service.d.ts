import { PropertyRepository } from "../repository/property.repository.ts";
import type { UpdateProperty } from "../schemas/property.ts";
import type { OwnerRepository } from "../repository/owner.repository.ts";
type CreateProperty = {
    name: string;
    address: string;
    userId: string;
};
export declare class PropertyService {
    private readonly propertyRepository;
    private readonly ownerRepository;
    constructor(propertyRepository: PropertyRepository, ownerRepository: OwnerRepository);
    create({ name, address, userId }: CreateProperty): Promise<{
        propertyId: string;
        name: string;
        address: string;
        ownerId: string;
    }>;
    getById(propertyId: string): Promise<{
        propertyId: string;
        name: string;
        address: string;
        ownerId: string;
    }>;
    update(propertyId: string, updateData: UpdateProperty): Promise<{
        propertyId: string;
        name: string;
        address: string;
        ownerId: string;
    }>;
    getAll(): Promise<{
        propertyId: string;
        name: string;
        address: string;
        ownerId: string;
    }[]>;
    getByOwnerId(userId: string): Promise<{
        propertyId: string;
        name: string;
        address: string;
        ownerId: string;
    } | null>;
}
export {};
//# sourceMappingURL=property.service.d.ts.map