export async function createIndexes(db) {
    await db.collection("guests").createIndex({ userId: 1 }, { unique: true });
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    //   await db.collection("propertyPricings").createIndex(
    //     { propertyId: 1, bedCount: 1 },
    //     { unique: true }
    //   );
}
//# sourceMappingURL=mongoIndexes.js.map