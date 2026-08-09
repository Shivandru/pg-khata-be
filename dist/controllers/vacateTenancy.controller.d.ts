import type { Request, Response } from "express";
import type { VacateTenancyService } from "../services/vacateTenancyService.ts";
export declare class VacateTenancyController {
    private readonly vacateTenancyService;
    constructor(vacateTenancyService: VacateTenancyService);
    vacate: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=vacateTenancy.controller.d.ts.map