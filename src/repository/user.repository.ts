import type { Collection, Db } from "mongodb";
import { type CreateUser, type User } from "../schemas/user.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";




export class UserRepository {

    constructor(
        private readonly db: Db
    ) {}
    private get collection(): Collection<User> {
        return this.db.collection<User>("users");
    }

    async create(userData: CreateUser): Promise<User> {
        const userId = generateId(ID_PREFIXES.user);
        const newUser: User = {
            userId,
            guestId: null,
            ...userData,
        };
        await this.collection.insertOne(newUser);
        return newUser;
    }

    async getUserById(userId: string): Promise<User | null> {
        return await this.collection.findOne({ userId });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.collection.findOne({ email });
    }

    async updateUser(userId: string, updateData: Partial<Omit<User, "userId" | "propertyId" | "guestId">>): Promise<User | null> {
        await this.collection.updateOne({ userId }, { $set: updateData });
        return await this.getUserById(userId);
    }

    async deleteUser(userId: string): Promise<boolean> {
        const result = await this.collection.deleteOne({ userId });
        return result.deletedCount > 0;
    }
}