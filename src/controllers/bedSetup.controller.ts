import type { Request, Response } from "express";
import type { BedSetupService } from "../services/bedSetup.service.ts";
import type { RoomById } from "../services/room.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class BedSetupController {
  constructor(
    private readonly bedSetupService: BedSetupService,
  ) {}

  setup = async (req: Request, res: Response) => {
    const { propertyId, roomId } = req.params as RoomById;

    const result = await this.bedSetupService.create({ propertyId, roomId });

    res.status(HttpStatusCodes.Success.CREATED).json(result);
  };
}