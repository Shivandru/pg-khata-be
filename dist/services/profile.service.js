import { NotFoundException } from "../utils/exceptions/client.js";
export class ProfileService {
    userRepository;
    guestRepository;
    ownerRepository;
    constructor(userRepository, guestRepository, ownerRepository) {
        this.userRepository = userRepository;
        this.guestRepository = guestRepository;
        this.ownerRepository = ownerRepository;
    }
    async getProfile(userId) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        if (user.role === "guest") {
            const guest = await this.guestRepository.getGuestByUserId(userId);
            if (!guest) {
                throw new NotFoundException(`Guest profile for user ${userId} not found`);
            }
            return {
                ...user,
                role: "guest",
                guestProfile: guest,
            };
        }
        if (user.role === "owner") {
            const owner = await this.ownerRepository.getOwnerByUserId(userId);
            if (!owner) {
                throw new NotFoundException(`Owner profile for user ${userId} not found`);
            }
            return {
                ...user,
                role: "owner",
                ownerProfile: owner,
            };
        }
        return {
            ...user,
            role: null,
        };
    }
}
//# sourceMappingURL=profile.service.js.map