import type { Request, Response } from "express";
import type { ProfileService } from "../services/profile.service.ts";
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getMe: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=profile.controller.d.ts.map