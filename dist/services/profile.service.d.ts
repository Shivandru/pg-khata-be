import type { GuestRepository } from "../repository/guest.repository.ts";
import type { OwnerRepository } from "../repository/owner.repository.ts";
import type { UserRepository } from "../repository/user.repository.ts";
import type { Profile } from "../schemas/profile.ts";
export declare class ProfileService {
    private readonly userRepository;
    private readonly guestRepository;
    private readonly ownerRepository;
    constructor(userRepository: UserRepository, guestRepository: GuestRepository, ownerRepository: OwnerRepository);
    getProfile(userId: string): Promise<Profile>;
}
//# sourceMappingURL=profile.service.d.ts.map