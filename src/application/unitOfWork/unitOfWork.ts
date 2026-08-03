// unitOfWork.ts

import type { RepositoryProvider } from "./repositoryProvider.ts";

export interface UnitOfWork {
    execute<T>(
        work: (repositories: RepositoryProvider) => Promise<T>
    ): Promise<T>;
}