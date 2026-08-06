import RequestLogger from "../middlewares/RequestLogger.ts";
import { UserRepository } from "../repository/user.repository.ts";
import { NotFoundException } from "../utils/exceptions/client.ts";
import { generateAccessToken } from "../utils/jwt.ts";
import { GoogleAuthService } from "./googleAuth.service.ts";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  async signup(idToken: string) {
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
    } else {
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

  //   async login(email: string) {
  //     const user = await this.userRepository.getUserByEmail(email);

  //     if (!user) {
  //       throw new NotFoundException(`User with email ${email} not found`);
  //     }

  //     const token = generateAccessToken({
  //       userId: user.userId,
  //       email: user.email,
  //       role: user.role,
  //     });

  //     RequestLogger.info(`User logged in: ${user.userId}`);

  //     return {
  //       user,
  //       token,
  //     };
  //   }
}
