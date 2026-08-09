import RequestLogger from "../middlewares/RequestLogger.js";
import { UserRepository } from "../repository/user.repository.js";
import { NotFoundException } from "../utils/exceptions/client.js";
import { generateAccessToken } from "../utils/jwt.js";
import { GoogleAuthService } from "./googleAuth.service.js";
export class AuthService {
    userRepository;
    googleAuthService;
    constructor(userRepository, googleAuthService) {
        this.userRepository = userRepository;
        this.googleAuthService = googleAuthService;
    }
    async signup(idToken) {
        const googleUser = await this.googleAuthService.verify(idToken);
        let user = await this.userRepository.getUserByEmail(googleUser.email);
        if (!user) {
            user = await this.userRepository.create({
                name: googleUser.name,
                email: googleUser.email,
                avatar: googleUser.avatar,
                provider: "google",
                role: null,
            });
            RequestLogger.info(`User created: ${user.userId}`);
        }
        else {
            await this.userRepository.updateUser(user.userId, {
                name: googleUser.name,
                avatar: googleUser.avatar,
            });
            const updatedUser = await this.userRepository.getUserById(user.userId);
            if (!updatedUser) {
                throw new NotFoundException(`User with ID ${user.userId} not found`);
            }
            user = updatedUser;
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
}
//# sourceMappingURL=auth.service.js.map