import type { Db, ClientSession } from "mongodb";
import type { CreateGuest, Guest, UpdateGuest } from "../schemas/guest.ts";
export declare class GuestRepository {
    private readonly db;
    private readonly session?;
    constructor(db: Db, session?: ClientSession | undefined);
    private get collection();
    create(guestData: CreateGuest & {
        userId: string;
    }): Promise<Guest>;
    getGuestById(guestId: string): Promise<Guest | null>;
    getGuestByUserId(userId: string): Promise<Guest | null>;
    updateGuest(guestId: string, updateData: UpdateGuest): Promise<Guest | null>;
    deleteGuest(guestId: string): Promise<boolean>;
    getGuestsByIds(guestIds: string[]): Promise<Guest[]>;
}
//# sourceMappingURL=guest.repository.d.ts.map