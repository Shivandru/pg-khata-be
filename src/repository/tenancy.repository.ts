import type { Collection, Db, ClientSession } from "mongodb";
import { generateId, ID_PREFIXES } from "../utils/common.ts";
import type { CreateTenancy, Tenancy, UpdateTenancy, VacateTenancy } from "../schemas/tenancy.ts";

export class TenancyRepository {
  constructor(private readonly db: Db, private readonly session?: ClientSession) {}

  private get collection(): Collection<Tenancy> {
    return this.db.collection<Tenancy>("tenancies");
  }
async create(tenancyData: CreateTenancy & { guestId: string }): Promise<Tenancy> {
    const tenancyId = generateId(ID_PREFIXES.tenancy);

    const newTenancy: Tenancy = {
      tenancyId,
      endDate: null,
      isActive: true,
      ...tenancyData,
    };

    await this.collection.insertOne(newTenancy, { session: this.session });

    return newTenancy;
  }

  async getTenancyById(tenancyId: string): Promise<Tenancy | null> {
    return await this.collection.findOne({ tenancyId }, { session: this.session });
  }

  async getActiveTenancyByGuestId(
    guestId: string,
  ): Promise<Tenancy | null> {
    return await this.collection.findOne({
      guestId,
      isActive: true,
    }, { session: this.session });
  }

  async updateTenancy(
    tenancyId: string,
    updateData: UpdateTenancy,
  ): Promise<Tenancy | null> {
    await this.collection.updateOne(
      { tenancyId },
      { $set: updateData },
      { session: this.session }
    );

    return await this.getTenancyById(tenancyId);
  }

  async vacate(
    tenancyId: string,
    endDate: VacateTenancy["endDate"],
  ): Promise<Tenancy | null> {
    await this.collection.updateOne(
      { tenancyId },
      {
        $set: {
          endDate,
          isActive: false,
        },
      },
      { session: this.session }
    );

    return await this.getTenancyById(tenancyId);
  }

  async deleteTenancy(tenancyId: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ tenancyId }, { session: this.session });

    return result.deletedCount > 0;
  }

}
