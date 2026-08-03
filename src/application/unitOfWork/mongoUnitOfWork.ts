import type { Db, MongoClient } from "mongodb";

import type { UnitOfWork } from "./unitOfWork.ts";
import type { RepositoryProvider } from "./repositoryProvider.ts";

import { PropertyRepository } from "../../repository/property.repository.ts";
import { RoomRepository } from "../../repository/room.repository.ts";
import { BedRepository } from "../../repository/bed.repository.ts";
import { PropertyPricingRepository } from "../../repository/propertyPricing.repository.ts";

export class MongoUnitOfWork implements UnitOfWork {
  constructor(
    private readonly client: MongoClient,
    private readonly db: Db,
  ) {}

  async execute<T>(
    work: (repositories: RepositoryProvider) => Promise<T>,
  ): Promise<T> {
    const session = this.client.startSession();

    try {
      let result!: T;

      await session.withTransaction(async () => {
        const repositories: RepositoryProvider = {
          propertyRepository: new PropertyRepository(this.db, session),
          roomRepository: new RoomRepository(this.db, session),
          bedRepository: new BedRepository(this.db, session),
          propertyPricingRepository: new PropertyPricingRepository(
            this.db,
            session,
          ),
        };

        result = await work(repositories);
      });

      return result;
    } finally {
      await session.endSession();
    }
  }
}
