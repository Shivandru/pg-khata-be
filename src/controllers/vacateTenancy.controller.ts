import type { Request, Response } from "express";
import { HttpStatusCodes } from "../utils/enums/http.ts";
import type { VacateTenancyService } from "../services/vacateTenancyService.ts";

export class VacateTenancyController {
  constructor(
    private readonly vacateTenancyService: VacateTenancyService,
  ) {}

  vacate = async (req: Request, res: Response) => {
    const { tenancyId } = req.params as { tenancyId: string };

    const tenancy = await this.vacateTenancyService.vacate(
      tenancyId,
      req.body,
    );

    res.status(HttpStatusCodes.Success.OK).json(tenancy);
  };
}