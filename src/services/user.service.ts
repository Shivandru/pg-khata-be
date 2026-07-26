import bcrypt from 'bcrypt';
import type { Role, User } from './../schemas/user.ts';
import { UserRepository } from "../repository/user.repository.ts";
import { NotFoundException, ConflictException } from "../utils/exceptions/client.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";

export class UserServices {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(name: string, email: string, password: string, phone: string, role: Role): Promise<User> {
        const existingUser = await this.userRepository.getUserByEmail(email);
        if (existingUser) {
            throw new ConflictException(`User with email ${email} already exists`);
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.userRepository.create({ name, email, password: passwordHash, phone, role });
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

    async update(userId: string, updateData: Partial<Omit<User, "userId" | "propertyId" | "guestId">>): Promise<User | null> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return await this.userRepository.updateUser(userId, updateData);
    }

    async delete(userId: string): Promise<boolean> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return await this.userRepository.deleteUser(userId);
    }
}