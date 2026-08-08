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

  getActiveTenancy = async (req: Request, res: Response) => {
    const tenancy = await this.tenancyRegistrationService.getActiveTenancy(
      req.user!.userId,
    );
    res.status(HttpStatusCodes.Success.OK).json(tenancy);
  };

  getTenanciesByProperty = async (req: Request, res: Response) => {
    const { propertyId } = req.params as { propertyId: string };
    const tenancies = await this.tenancyRegistrationService.getTenanciesByProperty(propertyId);
    res.status(HttpStatusCodes.Success.OK).json(tenancies);
  };

  getGuestsByProperty = async (req: Request, res: Response) => {
    const { propertyId } = req.params as { propertyId: string };
    const guests = await this.tenancyRegistrationService.getGuestsByProperty(propertyId);
    res.status(HttpStatusCodes.Success.OK).json(guests);
  };
}