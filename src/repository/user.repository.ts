import type { Collection } from "mongodb";
import MongoConnection from "../config/db.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";
import { type CreateUser, type User } from "../schemas/user.ts";




export class UserRepository {
    private getCollection(): Collection<User> {
        return MongoConnection.getInstance().getDb().collection<User>("users");
    }

    async create(userData: CreateUser): Promise<User> {
        const userId = generateId(ID_PREFIXES.user);
        const newUser: User = {
            userId,
            guestId: null,
            ...userData,
        };
        await this.getCollection().insertOne(newUser);
        return newUser;
    }

    async getUserById(userId: string): Promise<User | null> {
        return await this.getCollection().findOne({ userId });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.getCollection().findOne({ email });
    }

    async updateUser(userId: string, updateData: Partial<Omit<User, "userId" | "propertyId" | "guestId">>): Promise<User | null> {
        await this.getCollection().updateOne({ userId }, { $set: updateData });
        return await this.getUserById(userId);
    }

    async deleteUser(userId: string): Promise<boolean> {
        const result = await this.getCollection().deleteOne({ userId });
        return result.deletedCount > 0;
    }
}