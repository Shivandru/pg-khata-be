import { MongoClient, Db } from "mongodb";
import { env } from "./env-validator.js";
class MongoConnection {
    static instance;
    client;
    db;
    uri;
    dbName;
    constructor(uri, dbName) {
        this.uri = uri;
        this.dbName = dbName;
        this.client = new MongoClient(this.uri);
    }
    static getInstance() {
        if (!MongoConnection.instance) {
            const uri = env.MONGO_DB_URI;
            const dbName = env.MONGO_DB_NAME;
            if (!uri || !dbName) {
                throw new Error("mongo env variables not set");
            }
            MongoConnection.instance = new MongoConnection(uri, dbName);
        }
        return MongoConnection.instance;
    }
    async connect() {
        try {
            if (!this.db) {
                await this.client.connect();
                this.db = this.client.db(this.dbName);
                console.log(`✅ MongoDb connected`);
            }
            return this.db;
        }
        catch (error) {
            throw new Error(`Error while connection MongoDb ${error}`);
        }
    }
    getDb() {
        if (!this.db) {
            throw new Error(`MongoDB not connected`);
        }
        return this.db;
    }
    getClient() {
        return this.client;
    }
}
export default MongoConnection;
//# sourceMappingURL=db.js.map