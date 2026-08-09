import type { Request, Response } from "express";
import type { TenancyRegistrationService } from "../services/tenancyRegistration.service.ts";
export declare class TenancyRegistrationController {
    private readonly tenancyRegistrationService;
    constructor(tenancyRegistrationService: TenancyRegistrationService);
    register: (req: Request, res: Response) => Promise<void>;
    getActiveTenancy: (req: Request, res: Response) => Promise<void>;
    getTenanciesByProperty: (req: Request, res: Response) => Promise<void>;
    getGuestsByProperty: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=tenancyRegistration.controller.d.ts.map