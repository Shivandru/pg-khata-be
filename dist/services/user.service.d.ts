import { UserRepository } from "../repository/user.repository.ts";
import type { Provider, Role, User } from "./../schemas/user.ts";
export declare class UserServices {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(name: string, email: string, phone: string, role: Role, provider: Provider): Promise<User>;
    getUser(userId: string): Promise<User | null>;
    update(userId: string, updateData: Partial<Omit<User, "userId" | "propertyId" | "guestId">>): Promise<{
        user: User;
        token?: string;
    } | null>;
    delete(userId: string): Promise<boolean>;
}
//# sourceMappingURL=user.service.d.ts.map