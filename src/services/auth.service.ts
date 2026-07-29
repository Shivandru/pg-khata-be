import { UserRepository } from "../repository/user.repository.ts";
import { type CreateUser } from "../schemas/user.ts";
import { NotFoundException } from "../utils/exceptions/client.ts";
import { generateAccessToken } from "../utils/jwt.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";

export class AuthService {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async signup(userData: CreateUser) {
    let user = await this.userRepository.getUserByEmail(userData.email);

    if (!user) {
        user = await this.userRepository.create(userData);
        RequestLogger.info(`User created: ${user.userId}`);
    } else {
        RequestLogger.info(`Existing user logged in: ${user.userId}`);
    }

    const token = generateAccessToken({
        userId: user.userId,
        email: user.email,
        role: user.role,
    });

    return {
        user,
        token,
    };
}

    async login(email: string) {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        const token = generateAccessToken({
            userId: user.userId,
            email: user.email,
            role: user.role,
        });

        RequestLogger.info(`User logged in: ${user.userId}`);

        return {
            user,
            token,
        };
    }
}