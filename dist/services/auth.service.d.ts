import { UserRepository } from "../repository/user.repository.ts";
import { GoogleAuthService } from "./googleAuth.service.ts";
export declare class AuthService {
    private readonly userRepository;
    private readonly googleAuthService;
    constructor(userRepository: UserRepository, googleAuthService: GoogleAuthService);
    signup(idToken: string): Promise<{
        user: {
            userId: string;
            name: string;
            email: string;
            provider: "google";
            role: "guest" | "owner" | null;
            phone?: string | undefined;
            avatar?: string | null | undefined;
        };
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map