import type { Request, Response } from "express";
import { GuestRegistrationService } from "../services/guestRegistration.service.ts";
export declare class GuestRegistrationController {
    private readonly guestRegistrationService;
    constructor(guestRegistrationService: GuestRegistrationService);
    register: (req: Request, res: Response) => Promise<void>;
    getMe: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=guestRegistration.controller.d.ts.map