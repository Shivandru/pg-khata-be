import type { GuestRepository } from "../repository/guest.repository.ts";
import type { UserRepository } from "../repository/user.repository.ts";
import type { Guest } from "../schemas/guest.ts";
import {
  ConflictException,
  NotFoundException,
} from "../utils/exceptions/client.ts";

export class GuestRegistrationService {
  constructor(
    private readonly guestRepository: GuestRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async register(userId: string, phone: string): Promise<Guest> {
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
      name: user.name,
      email: user.email,
      phone,
      kycInfo: {},
    });
  }
}
