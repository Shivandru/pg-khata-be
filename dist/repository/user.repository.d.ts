import type { ClientSession, Db } from "mongodb";
import { type CreateUser, type User } from "../schemas/user.ts";
export declare class UserRepository {
    private readonly db;
    private readonly session?;
    constructor(db: Db, session?: ClientSession | undefined);
    private get collection();
    create(userData: CreateUser): Promise<User>;
    getUserById(userId: string): Promise<User | null>;
    getUsersByIds(userIds: string[]): Promise<User[]>;
    getUserByEmail(email: string): Promise<User | null>;
    updateUser(userId: string, updateData: Partial<Omit<User, "userId" | "propertyId" | "guestId">>): Promise<User | null>;
    deleteUser(userId: string): Promise<boolean>;
}
//# sourceMappingURL=user.repository.d.ts.map