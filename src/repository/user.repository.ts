import type { ClientSession, Collection, Db } from "mongodb";
import { type CreateUser, type User } from "../schemas/user.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

export class UserRepository {
  constructor(
    private readonly db: Db,
    private readonly session?: ClientSession,
  ) {}
  private get collection(): Collection<User> {
    return this.db.collection<User>("users");
  }

  async create(userData: CreateUser): Promise<User> {
    const userId = generateId(ID_PREFIXES.user);
    const newUser: User = {
      userId,
      ...userData,
    };
    await this.collection.insertOne(newUser, { session: this.session });
    return newUser;
  }

  async getUserById(userId: string): Promise<User | null> {
    return await this.collection.findOne({ userId }, { session: this.session });
  }

  async getUsersByIds(userIds: string[]): Promise<User[]> {
    return await this.collection
      .find({ userId: { $in: userIds } }, { session: this.session })
      .toArray();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.collection.findOne({ email }, { session: this.session });
  }

  async updateUser(
    userId: string,
    updateData: Partial<Omit<User, "userId" | "propertyId" | "guestId">>,
  ): Promise<User | null> {
    await this.collection.updateOne(
      { userId },
      { $set: updateData },
      { session: this.session },
    );
    return await this.getUserById(userId);
  }

  async deleteUser(userId: string): Promise<boolean> {
    const result = await this.collection.deleteOne(
      { userId },
      { session: this.session },
    );
    return result.deletedCount > 0;
  }
}
