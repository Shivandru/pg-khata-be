import type { Request, Response } from "express";
import type { TenancyRegistrationService } from "../services/tenancyRegistration.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class TenancyRegistrationController {
  constructor(
    private readonly tenancyRegistrationService: TenancyRegistrationService,
  ) {}

  register = async (req: Request, res: Response) => {
    const tenancy = await this.tenancyRegistrationService.register(
      req.user!.userId,
      req.body,
    );

    res.status(HttpStatusCodes.Success.CREATED).json(tenancy);
  };
}