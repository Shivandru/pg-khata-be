import { MongoClient, Db } from "mongodb";
declare class MongoConnection {
    private static instance;
    private client;
    private db?;
    private uri;
    private dbName;
    private constructor();
    static getInstance(): MongoConnection;
    connect(): Promise<Db>;
    getDb(): Db;
    getClient(): MongoClient;
}
export default MongoConnection;
//# sourceMappingURL=db.d.ts.map