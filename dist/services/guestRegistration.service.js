import { ConflictException, NotFoundException, } from "../utils/exceptions/client.js";
export class GuestRegistrationService {
    guestRepository;
    userRepository;
    constructor(guestRepository, userRepository) {
        this.guestRepository = guestRepository;
        this.userRepository = userRepository;
    }
    async register(userId) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        if (user.role !== "guest") {
            throw new ConflictException("Only guest users can register as guests.");
        }
        const existingGuest = await this.guestRepository.getGuestByUserId(userId);
        if (existingGuest) {
            throw new ConflictException("Guest profile already exists.");
        }
        return await this.guestRepository.create({
            userId,
            kycInfo: {},
        });
    }
    async getGuestByUserId(userId) {
        const guest = await this.guestRepository.getGuestByUserId(userId);
        if (!guest) {
            throw new NotFoundException(`Guest profile for user ${userId} not found`);
        }
        return guest;
    }
}
//# sourceMappingURL=guestRegistration.service.js.map