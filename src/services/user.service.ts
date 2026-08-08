import RequestLogger from "../middlewares/RequestLogger.ts";
import { UserRepository } from "../repository/user.repository.ts";
import {
  ConflictException,
  NotFoundException,
} from "../utils/exceptions/client.ts";
import type { Provider, Role, User } from "./../schemas/user.ts";
import { generateAccessToken } from "../utils/jwt.ts";

export class UserServices {
  constructor(private readonly userRepository: UserRepository) {}

  async create(
    name: string,
    email: string,
    phone: string,
    role: Role,
    provider: Provider,
  ): Promise<User> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    const user = await this.userRepository.create({
      name,
      email,
      phone,
      role,
      provider,
    });
    RequestLogger.info(`User created: ${user.userId}`);
    return user;
  }

  async getUser(userId: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async update(
    userId: string,
    updateData: Partial<Omit<User, "userId" | "propertyId" | "guestId">>,
  ): Promise<{ user: User; token?: string } | null> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updatedUser = await this.userRepository.updateUser(
      userId,
      updateData,
    );

    if (!updatedUser) {
      return null;
    }

    let token: string | undefined;

    if (updatedUser.role !== user.role || updatedUser.email !== user.email) {
      token = generateAccessToken({
        userId: updatedUser.userId,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    }

    return {
      user: updatedUser,
      token,
    };
  }

  async delete(userId: string): Promise<boolean> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return await this.userRepository.deleteUser(userId);
  }
}
