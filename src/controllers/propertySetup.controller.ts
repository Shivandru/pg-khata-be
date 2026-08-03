import type { Request, Response } from "express";
import { HttpStatusCodes } from "../utils/enums/http.ts";
import type { PropertySetupService } from "../services/propertySetup.service.ts";

export class PropertySetupController {

  constructor(private readonly propertySetupService: PropertySetupService) {}

  setup = async (req: Request, res: Response) => {
    const ownerId = req.user?.userId as string;
    const result = await this.propertySetupService.setup(ownerId, req.body);

    res.status(HttpStatusCodes.Success.CREATED).json(result);
  };
}
