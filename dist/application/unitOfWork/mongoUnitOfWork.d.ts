import type { Db, MongoClient } from "mongodb";
import type { UnitOfWork } from "./unitOfWork.ts";
import type { RepositoryProvider } from "./repositoryProvider.ts";
export declare class MongoUnitOfWork implements UnitOfWork {
    private readonly client;
    private readonly db;
    constructor(client: MongoClient, db: Db);
    execute<T>(work: (repositories: RepositoryProvider) => Promise<T>): Promise<T>;
}
//# sourceMappingURL=mongoUnitOfWork.d.ts.map