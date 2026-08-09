import RequestLogger from "../middlewares/RequestLogger.js";
import { UserRepository } from "../repository/user.repository.js";
import { ConflictException, NotFoundException, } from "../utils/exceptions/client.js";
import { generateAccessToken } from "../utils/jwt.js";
export class UserServices {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(name, email, phone, role, provider) {
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
    async getUser(userId) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }
    async update(userId, updateData) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        const updatedUser = await this.userRepository.updateUser(userId, updateData);
        if (!updatedUser) {
            return null;
        }
        let token;
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
    async delete(userId) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return await this.userRepository.deleteUser(userId);
    }
}
//# sourceMappingURL=user.service.js.map