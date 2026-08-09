import type { GuestRepository } from "../repository/guest.repository.ts";
import type { UserRepository } from "../repository/user.repository.ts";
import type { Guest } from "../schemas/guest.ts";
export declare class GuestRegistrationService {
    private readonly guestRepository;
    private readonly userRepository;
    constructor(guestRepository: GuestRepository, userRepository: UserRepository);
    register(userId: string): Promise<Guest>;
    getGuestByUserId(userId: string): Promise<Guest>;
}
//# sourceMappingURL=guestRegistration.service.d.ts.map