import {} from "../schemas/user.js";
import { generateId, ID_PREFIXES } from "../utils/common.js";
export class UserRepository {
    db;
    session;
    constructor(db, session) {
        this.db = db;
        this.session = session;
    }
    get collection() {
        return this.db.collection("users");
    }
    async create(userData) {
        const userId = generateId(ID_PREFIXES.user);
        const newUser = {
            userId,
            ...userData,
        };
        await this.collection.insertOne(newUser, { session: this.session });
        return newUser;
    }
    async getUserById(userId) {
        return await this.collection.findOne({ userId }, { session: this.session });
    }
    async getUsersByIds(userIds) {
        return await this.collection
            .find({ userId: { $in: userIds } }, { session: this.session })
            .toArray();
    }
    async getUserByEmail(email) {
        return await this.collection.findOne({ email }, { session: this.session });
    }
    async updateUser(userId, updateData) {
        await this.collection.updateOne({ userId }, { $set: updateData }, { session: this.session });
        return await this.getUserById(userId);
    }
    async deleteUser(userId) {
        const result = await this.collection.deleteOne({ userId }, { session: this.session });
        return result.deletedCount > 0;
    }
}
//# sourceMappingURL=user.repository.js.map