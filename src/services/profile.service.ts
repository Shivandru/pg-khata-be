import type { GuestRepository } from "../repository/guest.repository.ts";
import type { OwnerRepository } from "../repository/owner.repository.ts";
import type { UserRepository } from "../repository/user.repository.ts";
import type { Profile } from "../schemas/profile.ts";
import { NotFoundException } from "../utils/exceptions/client.ts";

export class ProfileService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly guestRepository: GuestRepository,
    private readonly ownerRepository: OwnerRepository,
  ) {}

  async getProfile(userId: string): Promise<Profile> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.role === "guest") {
      const guest = await this.guestRepository.getGuestByUserId(userId);

      if (!guest) {
        throw new NotFoundException(
          `Guest profile for user ${userId} not found`,
        );
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
        throw new NotFoundException(
          `Owner profile for user ${userId} not found`,
        );
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
