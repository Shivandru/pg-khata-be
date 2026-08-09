import { PropertyRepository } from "../../repository/property.repository.js";
import { RoomRepository } from "../../repository/room.repository.js";
import { BedRepository } from "../../repository/bed.repository.js";
import { PropertyPricingRepository } from "../../repository/propertyPricing.repository.js";
import { GuestRepository } from "../../repository/guest.repository.js";
import { TenancyRepository } from "../../repository/tenancy.repository.js";
import { UserRepository } from "../../repository/user.repository.js";
export class MongoUnitOfWork {
    client;
    db;
    constructor(client, db) {
        this.client = client;
        this.db = db;
    }
    async execute(work) {
        const session = this.client.startSession();
        try {
            let result;
            await session.withTransaction(async () => {
                const repositories = {
                    propertyRepository: new PropertyRepository(this.db, session),
                    roomRepository: new RoomRepository(this.db, session),
                    bedRepository: new BedRepository(this.db, session),
                    propertyPricingRepository: new PropertyPricingRepository(this.db, session),
                    guestRepository: new GuestRepository(this.db, session),
                    tenancyRepository: new TenancyRepository(this.db, session),
                    userRepository: new UserRepository(this.db, session),
                };
                result = await work(repositories);
            });
            return result;
        }
        finally {
            await session.endSession();
        }
    }
}
//# sourceMappingURL=mongoUnitOfWork.js.map